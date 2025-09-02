import { useEffect, useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg";
import iconclock from "../assets/images/icon-clock.svg";
import iconaway from "../assets/images/icon-away.svg";
import setclock from "../assets/images/clock.svg";
import playbtn from "../assets/images/play-icon.svg";
import pausebtn from "../assets/images/pause-icon.svg";
import plus from "../assets/images/plus.svg";
import minus from "../assets/images/minus.svg";

interface Props {
  gameStatistics: any;
  gameId: string;
  socketEmit: (event: string, payload: any) => void;
}

export default function ScoreKeeperComponent({ gameStatistics, gameId, socketEmit }: Props) {
  // Scores & quarters
  const [homeScore, setHomeScore] = useState<number>(gameStatistics?.homeTeam?.score || 0);
  const [awayScore, setAwayScore] = useState<number>(gameStatistics?.awayTeam?.score || 0);
  const [quarter, setQuarter] = useState<number>(gameStatistics?.clock?.quarter || 1);

  // Clock
  const [minutes, setMinutes] = useState<number>(gameStatistics?.clock?.minutes || 0);
  const [seconds, setSeconds] = useState<number>(gameStatistics?.clock?.seconds || 0);
  const [running, setRunning] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prevSec) => {
          let newSec = prevSec - 1;
          let newMin = minutes;
          if (newSec < 0) {
            if (minutes > 0) {
              newMin -= 1;
              newSec = 59;
              setMinutes(newMin);
            } else {
              newSec = 0;
              setRunning(false);
            }
          }

          // Emit updated clock to server
          socketEmit("updateClock", { gameId, quarter, minutes: newMin, seconds: newSec });
          return newSec;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running, minutes, quarter, gameId]);

  // Update scores with socket
  const handleUpdateScore = (team: "home" | "away", delta: number) => {
    let newScore = team === "home" ? homeScore + delta : awayScore + delta;
    if (newScore < 0) newScore = 0;

    if (team === "home") setHomeScore(newScore);
    else setAwayScore(newScore);

    socketEmit("setScore", { gameId, team, value: newScore });
  };

  // Format mm:ss
  const formatTime = (m: number, s: number) => `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // Clock controls
  const handleToggleTimer = () => setRunning((prev) => !prev);
  const handleSetClock = () => socketEmit("updateClock", { gameId, quarter, minutes, seconds });
  const handleReset = () => {
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(1);
    setMinutes(0);
    setSeconds(0);
    setRunning(false);
    socketEmit("resetGame", { gameId });
  };

  return (
    <>
      <div className="score-board-otr">
        <div className="row m-0 score-keeper justify-content-center">
          {/* Home */}
          <div className="col-md-4 score-card-innr p-0">
            <div className="score-card">
              <div className="score-icon"><img src={iconngo} alt="home icon" /></div>
              <h3>Home</h3>
              <div className="score-content">
                <div className="quantity">
                  <button className="qty-btn" onClick={() => handleUpdateScore("home", -1)}><img src={minus} alt="-" /></button>
                  <input type="number" value={homeScore} min={0} onChange={(e) => handleUpdateScore("home", Number(e.target.value) - homeScore)} />
                  <button className="qty-btn" onClick={() => handleUpdateScore("home", 1)}><img src={plus} alt="+" /></button>
                </div>
                <ul>
                  {gameStatistics?.goals
                    ?.filter((g: any) => g.team.toLowerCase() === "home")
                    .map((g: any, i: number) => (
                      <li key={i}>{g.minute}’ #{g.playerNo}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quarters + Timer */}
          <div className="col-md-4 score-card-innr p-0">
            <div className="score-card">
              <div className="score-icon"><img src={iconclock} alt="clock icon" /></div>
              <h3>Quarter {quarter}</h3>
              <div className="score-content pb-0">
                <div className="quantity">
                  <button className="qty-btn" onClick={() => setQuarter(quarter > 1 ? quarter - 1 : 1)}><img src={minus} alt="-" /></button>
                  <input type="number" value={quarter} min={1} onChange={(e) => setQuarter(Number(e.target.value))} />
                  <button className="qty-btn" onClick={() => setQuarter(quarter + 1)}><img src={plus} alt="+" /></button>
                </div>
                <div className="timer">
                  <span>{formatTime(minutes, seconds)}</span>
                </div>
              </div>

              <div className="set-clock">
                <div className="time-select">
                  <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="form-control">
                    {Array.from({ length: 60 }, (_, i) => i).map((m) => <option key={m} value={m}>{m} Min</option>)}
                  </select>
                  <select value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className="form-control">
                    {Array.from({ length: 60 }, (_, i) => i).map((s) => <option key={s} value={s}>{s} Sec</option>)}
                  </select>
                </div>
                <div className="clock" onClick={handleSetClock} style={{ cursor: "pointer" }}>
                  Set Clock <span><img src={setclock} alt="set clock" /></span>
                </div>
                <button className="play-btn" onClick={handleToggleTimer}>
                  <img src={running ? pausebtn : playbtn} alt={running ? "pause" : "play"} />
                </button>
              </div>
            </div>
          </div>

          {/* Away */}
          <div className="col-md-4 score-card-innr p-0">
            <div className="score-card">
              <div className="score-icon"><img src={iconaway} alt="away icon" /></div>
              <h3>Away</h3>
              <div className="score-content">
                <div className="quantity">
                  <button className="qty-btn" onClick={() => handleUpdateScore("away", -1)}><img src={minus} alt="-" /></button>
                  <input type="number" value={awayScore} min={0} onChange={(e) => handleUpdateScore("away", Number(e.target.value) - awayScore)} />
                  <button className="qty-btn" onClick={() => handleUpdateScore("away", 1)}><img src={plus} alt="+" /></button>
                </div>
                <ul>
                  {gameStatistics?.goals
                    ?.filter((g: any) => g.team.toLowerCase() === "away")
                    .map((g: any, i: number) => (
                      <li key={i}>{g.minute}’ #{g.playerNo}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="text-center mt-30 d-none d-md-block">
        <button type="button" className="btn btn-primary" onClick={handleReset}>Reset Game</button>
      </div>
    </>
  );
}
