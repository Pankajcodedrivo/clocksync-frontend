import { useState } from "react";
import plus from "../assets/images/plus.svg";
import minus from "../assets/images/minus.svg";

type GameStatsProps = {
  gameStatistics: any;
  emit: (event: string, payload: any) => void;
};

export default function GameStatisticsScoreKeeper({ gameStatistics, emit }: GameStatsProps) {
  const [stats, setStats] = useState(gameStatistics?.stats || {});

  // Generic function to update any stat
  const handleUpdateStat = (team: "home" | "away", field: string, delta: number) => {
    const currentVal = stats?.[`${team}Team`]?.stats?.[field] || 0;
    let newVal = currentVal + delta;
    if (newVal < 0) newVal = 0;

    // Update local state
    setStats((prev: any) => ({
      ...prev,
      [`${team}Team`]: {
        ...prev[`${team}Team`],
        stats: {
          ...prev[`${team}Team`].stats,
          [field]: newVal,
        },
      },
    }));

    // Emit socket update
    emit("setStat", {
      gameId: stats.gameId,
      team,
      field,
      value: newVal,
    });
  };

  const homeScore = stats?.homeTeam?.score || 0;
  const awayScore = stats?.awayTeam?.score || 0;

  const homePenalties = stats?.homeTeam?.stats?.penalties || 0;
  const awayPenalties = stats?.awayTeam?.stats?.penalties || 0;

  const homeShots = stats?.homeTeam?.stats?.shots || 0;
  const awayShots = stats?.awayTeam?.stats?.shots || 0;

  const homeSaves = stats?.homeTeam?.stats?.saves || 0;
  const awaySaves = stats?.awayTeam?.stats?.saves || 0;

  const homeFouls = stats?.homeTeam?.stats?.fouls || 0;
  const awayFouls = stats?.awayTeam?.stats?.fouls || 0;

  return (
    <div className="cmn-box-wrapper p-36">
      <div className="statictics-wrapper">
        <div className="row statictics-otr align-items-end align-items-md-start">
          {/* Home Score */}
          <div className="col-4 statictics-innr">
            <div className="count-inn">
              <span className="qty-btn" onClick={() => handleUpdateStat("home", "score", -1)}>
                <img src={minus} alt="minus" />
              </span>
              <h4>Home</h4>
              <span className="qty-btn" onClick={() => handleUpdateStat("home", "score", 1)}>
                <img src={plus} alt="plus" />
              </span>
            </div>
            <p className="blue lg">{homeScore} <span>-</span> {awayScore}</p>
          </div>

          {/* Penalties */}
          <div className="col-4 statictics-innr">
            <div className="count-inn">
              <span className="qty-btn" onClick={() => handleUpdateStat("home", "penalties", -1)}>
                <img src={minus} alt="minus" />
              </span>
              <h4>Penalties</h4>
              <span className="qty-btn" onClick={() => handleUpdateStat("home", "penalties", 1)}>
                <img src={plus} alt="plus" />
              </span>
            </div>
            <p className="green lg">{homePenalties} <span>-</span> {awayPenalties}</p>
            <div className="count-inn">
              <span className="qty-btn" onClick={() => handleUpdateStat("away", "penalties", -1)}>
                <img src={minus} alt="minus" />
              </span>
              <span className="qty-btn" onClick={() => handleUpdateStat("away", "penalties", 1)}>
                <img src={plus} alt="plus" />
              </span>
            </div>
          </div>

          {/* Away Score */}
          <div className="col-4 statictics-innr">
            <div className="count-inn">
              <span className="qty-btn" onClick={() => handleUpdateStat("away", "score", -1)}>
                <img src={minus} alt="minus" />
              </span>
              <h4>Away</h4>
              <span className="qty-btn" onClick={() => handleUpdateStat("away", "score", 1)}>
                <img src={plus} alt="plus" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="statictics-wrapper bottom">
        <div className="row statictics-otr">
          {/* Shots */}
          <div className="col-md-4 statictics-innr">
            <h4 className="sm">SHOTS</h4>
            <div className="count-inn gap-10">
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "shots", -1)}><img src={minus} alt="" /></span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "shots", 1)}><img src={plus} alt="" /></span>
              </div>
              <p className="blue sm">{homeShots} <span>-</span> {awayShots}</p>
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "shots", -1)}><img src={minus} alt="" /></span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "shots", 1)}><img src={plus} alt="" /></span>
              </div>
            </div>
          </div>

          {/* Saves */}
          <div className="col-md-4 statictics-innr">
            <h4 className="sm">SAVES</h4>
            <div className="count-inn gap-10">
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "saves", -1)}><img src={minus} alt="" /></span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "saves", 1)}><img src={plus} alt="" /></span>
              </div>
              <p className="green sm">{homeSaves} <span>-</span> {awaySaves}</p>
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "saves", -1)}><img src={minus} alt="" /></span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "saves", 1)}><img src={plus} alt="" /></span>
              </div>
            </div>
          </div>

          {/* Fouls */}
          <div className="col-md-4 statictics-innr">
            <h4 className="sm">FOULS</h4>
            <div className="count-inn gap-10">
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "fouls", -1)}><img src={minus} alt="" /></span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "fouls", 1)}><img src={plus} alt="" /></span>
              </div>
              <p className="orange sm">{homeFouls} <span>-</span> {awayFouls}</p>
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "fouls", -1)}><img src={minus} alt="" /></span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "fouls", 1)}><img src={plus} alt="" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
