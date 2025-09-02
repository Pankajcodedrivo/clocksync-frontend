import { useEffect, useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg";
import iconclock from "../assets/images/icon-clock.svg";
import iconaway from "../assets/images/icon-away.svg";
import setclock from "../assets/images/clock.svg";
import playbtn from "../assets/images/play-icon.svg";
import pausebtn from "../assets/images/pause-icon.svg"; // 👈 add this new SVG
import plus from "../assets/images/plus.svg";
import minus from "../assets/images/minus.svg";

export default function ScoreKeeperComponent() {
  // Scores & quarters
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [quarter, setQuarter] = useState<number>(1);

  // Timer
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // total seconds
  const [running, setRunning] = useState<boolean>(false);

  // Countdown effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (running && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      setRunning(false);
    }
    return () => clearInterval(timer);
  }, [running, timeLeft]);

  // Sync minutes/seconds with timeLeft
  useEffect(() => {
    if (timeLeft !== null) {
      setMinutes(Math.floor(timeLeft / 60));
      setSeconds(timeLeft % 60);
    }
  }, [timeLeft]);

  // Format mm:ss
  const formatTime = (total: number) => {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Set clock
  const handleSetClock = () => {
    const total = minutes * 60 + seconds;
    setTimeLeft(total);
    setRunning(false);
  };

  // Play / Pause toggle
  const handleToggleTimer = () => {
    if (timeLeft !== null && timeLeft > 0) {
      setRunning((prev) => !prev);
    }
  };

  // Reset
  const handleReset = () => {
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(1);
    setMinutes(1);
    setSeconds(0);
    setTimeLeft(null);
    setRunning(false);
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
                  <button className="qty-btn" onClick={() => setHomeScore(homeScore > 0 ? homeScore - 1 : 0)}><img src={minus} alt="-" /></button>
                  <input type="number" value={homeScore} min={0} onChange={(e) => setHomeScore(Number(e.target.value))} />
                  <button className="qty-btn" onClick={() => setHomeScore(homeScore + 1)}><img src={plus} alt="+" /></button>
                </div>
                <ul>
                    <li>5’ Darrel Bins</li>
                    <li>7’ Darrel Bins</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quarters + Timer */}
          <div className="col-md-4 score-card-innr p-0">
            <div className="score-card">
              <div className="score-icon"><img src={iconclock} alt="clock icon" /></div>
              <h3>Quarters</h3>
              <div className="score-content pb-0">
                <div className="quantity">
                  <button className="qty-btn" onClick={() => setQuarter(quarter > 1 ? quarter - 1 : 1)}><img src={minus} alt="-" /></button>
                  <input type="number" value={quarter} min={1} onChange={(e) => setQuarter(Number(e.target.value))} />
                  <button className="qty-btn" onClick={() => setQuarter(quarter + 1)}><img src={plus} alt="+" /></button>
                </div>
                <div className="timer">
                  {timeLeft !== null ? <span>{formatTime(timeLeft)}</span> : <span>00:00</span>}
                </div>
              </div>

              {/* Timer controls */}
              <div className="set-clock">
                <div className="time-select">
                  <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="form-control">
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{m} Min</option>
                    ))}
                  </select>
                  <select value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className="form-control">
                    {Array.from({ length: 60 }, (_, i) => i).map((s) => (
                      <option key={s} value={s}>{s} Sec</option>
                    ))}
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

            <div className="text-center d-block d-md-none mt-10">
              <button type="button" className="btn btn-primary" onClick={handleReset}>Reset Game</button>
            </div>
          </div>

          {/* Away */}
          <div className="col-md-4 score-card-innr p-0">
            <div className="score-card">
              <div className="score-icon"><img src={iconaway} alt="away icon" /></div>
              <h3>Away</h3>
              <div className="score-content">
                <div className="quantity">
                  <button className="qty-btn" onClick={() => setAwayScore(awayScore > 0 ? awayScore - 1 : 0)}><img src={minus} alt="-" /></button>
                  <input type="number" value={awayScore} min={0} onChange={(e) => setAwayScore(Number(e.target.value))} />
                  <button className="qty-btn" onClick={() => setAwayScore(awayScore + 1)}><img src={plus} alt="+" /></button>
                </div>
                <ul>
                    <li>5’ Darrel Bins</li>
                    <li>7’ Darrel Bins</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Desktop */}
      <div className="text-center mt-30 d-none d-md-block">
        <button type="button" className="btn btn-primary" onClick={handleReset}>Reset Game</button>
      </div>
    </>
  );
}