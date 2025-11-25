import { useState, useEffect } from "react";
import iconngo from "../assets/images/icon-ngo.svg";
import iconclock from "../assets/images/icon-clock.svg";
import iconaway from "../assets/images/icon-away.svg";

interface Props {
  gameStatistics: any;
  game: any;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

export default function ScoreBoardComponent({ gameStatistics, game }: Props) {
  const homeScore = gameStatistics?.homeTeam?.score || 0;
  const awayScore = gameStatistics?.awayTeam?.score || 0;
  const quarter = gameStatistics?.clock?.quarter || 0;
  const minutes = gameStatistics?.clock?.minutes || 0;
  const seconds = gameStatistics?.clock?.seconds || 0;
  const isMobile = useIsMobile();

  const formatTime = (m: number, s: number) =>
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const renderTeam = (team: "home" | "away") => {
    const teamName = team === "home" ? game?.homeTeamName : game?.awayTeamName;
    const teamLogo =
      team === "home" ? game?.homeTeamLogo || iconngo : game?.awayTeamLogo || iconaway;
    const score = team === "home" ? homeScore : awayScore;
    
    return (
      <>
        <div className="score-icon">
          <img src={teamLogo} alt={`${team} icon`} />
        </div>
        <h3>{teamName}</h3>
        <div className="score-content">
          <h2 className="score">{score}</h2>
          <ul>
           {gameStatistics?.actions
            ?.filter(
              (g: any) =>
                g.team.toLowerCase() === team.toLowerCase() &&
                g.type === "goal"
            )
            .map((g: any, i: number) => (
              <li key={i}>
                {g.minute}’
                {g.second ? `${String(g.second).padStart(2, "0")}’’ ` : ""} 
                #{g.playerNo}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderClock = () => (
    <>
      <div className="score-icon">
        <img src={iconclock} alt="clock icon" />
      </div>
      <h3>Quarters</h3>
      <div className="score-content">
        <h2 className="score">{quarter}</h2>
        <div className="timer">
          <span>{formatTime(minutes, seconds)}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="score-board-otr">
      {isMobile ? (
        // 👉 Mobile Layout: Home + Clock + Away in one line
        <div className="col-md-12 score-card-innr p-0">
            <div className="score-card mobile-score">
                <div className="score-home-team">{renderTeam("home")}</div>
                <div className="score-clock-card">{renderClock()}</div>
                <div className="score-away-team">{renderTeam("away")}</div>
            </div>
        </div>
      ) : (
        // 👉 Desktop Layout: Home | Clock | Away (3 columns)
        <div className="row m-0 justify-content-center">
          <div className="col-md-4 score-card-innr p-0"><div className="score-card">{renderTeam("home")}</div></div>
          <div className="col-md-4 score-card-innr p-0"><div className="score-card">{renderClock()}</div></div>
          <div className="col-md-4 score-card-innr p-0"><div className="score-card">{renderTeam("away")}</div></div>
        </div>
      )}
    </div>
  );
}
