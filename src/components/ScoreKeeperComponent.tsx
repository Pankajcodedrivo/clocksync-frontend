import { useEffect, useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg";
import iconaway from "../assets/images/icon-away.svg";

interface Props {
  gameStatistics: any;
  game: any;
}

export default function ScoreKeeperComponent({ gameStatistics,game }: Props) {
  const [homeScore, setHomeScore] = useState<number>(gameStatistics?.homeTeam?.score || 0);
  const [awayScore, setAwayScore] = useState<number>(gameStatistics?.awayTeam?.score || 0);

  // Listen for updates from parent (which gets them from socket)
  useEffect(() => {
    setHomeScore(gameStatistics.homeTeam?.score || 0);
    setAwayScore(gameStatistics.awayTeam?.score || 0);
  }, [gameStatistics]);

  return (
    <div className="score-board-otr">
      <div className="row m-0 score-keeper justify-content-center">
        {/* Home */}
        <div className="col-md-6 score-card-innr p-0">
          <div className="score-card">
            <div className="score-icon"><img src={game?.homeTeamLogo?game?.homeTeamLogo:iconngo} alt="home icon" /></div>
            <h3>{game?.homeTeamName ||"Home"}</h3>
            <div className="score-content">
              <div className="quantity">
                {homeScore}
              </div>
              <div className="penalty-wrap">
                <div className="penalty-player">#8</div>
                <div className="penalty-time">1:30</div>
              </div>
              <ul>
                <li>GB<span>0</span></li>
                <li>Shots<span>0/0</span></li>
                <li>Saves<span>0</span></li>
                <li>Draws<span>0/0</span></li>
                <li>TO<span>0/0</span></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Away */}
        <div className="col-md-6 score-card-innr p-0">
          <div className="score-card">
            <div className="score-icon"><img src={game?.awayTeamLogo?game?.awayTeamLogo:iconaway} alt="away icon" /></div>
            <h3>{game?.awayTeamName || "Away"}</h3>
            <div className="score-content">
              <div className="quantity">
                {awayScore}
              </div>
              <div className="penalty-wrap">
                <div className="penalty-player">#8</div>
                <div className="penalty-time">1:30</div>
              </div>
              <ul>
                <li>GB<span>0</span></li>
                <li>Shots<span>0/0</span></li>
                <li>Saves<span>0</span></li>
                <li>Draws<span>0/0</span></li>
                <li>TO<span>0/0</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}