import iconngo from "../assets/images/blue-icon.svg";
import iconaway from "../assets/images/red-icon.svg";

interface Props {
  gameStatistics: any;
  game: any;
  socketEmit: (event: string, payload: any) => void;
}

export default function ScoreKeeperComponent({ gameStatistics, game, socketEmit }: Props) {
  const clock = gameStatistics?.clock;

  // -------------------------
  // GET ACTIVE PENALTY LOGIC
  // -------------------------
  const getActivePenalty = (team: "home" | "away") => {
    const penalties = gameStatistics?.actions?.filter(
      (a: any) => a.type === "penalty" && a.team === team
    );
    if (!penalties || penalties.length === 0) return null;

    const p = penalties[penalties.length - 1];

    const totalPenaltySeconds =
      (p.penaltyMinutes ?? 0) * 60 + (p.penaltySeconds ?? 0);

    // Game clock now (counting DOWN)
    const current = clock.minutes * 60 + clock.seconds;

    // When the penalty was given
    const start = (p.minute ?? 0) * 60 + (p.second ?? 0);

    // **Clock is countdown → elapsed = start - current**
    const elapsed = start - current;

    const remaining = totalPenaltySeconds - elapsed;

    if (remaining <= 0) return null;

    return {
      ...p,
      remainingMinutes: Math.floor(remaining / 60),
      remainingSeconds: remaining % 60,
    };
  };
  const homePenalty = getActivePenalty("home");
  const awayPenalty = getActivePenalty("away");

  const home = gameStatistics?.homeTeam;
  const away = gameStatistics?.awayTeam;

  const homeStats = home?.stats || {};
  const awayStats = away?.stats || {};

  const removePenalty = (id:any) => {
    socketEmit("removePenalty", { id , gameId:game?._id });
  };

  return (
    <div className="score-board-otr">
      <div className="row g-5 score-keeper justify-content-center">

        {/* ---------------- HOME ---------------- */}
        <div className="col-md-6 score-card-innr">
          <div className="score-card">
            <div className="score-icon">
              <img src={game?.homeTeamLogo || iconngo} alt="home icon" />
            </div>

            <h3>{game?.homeTeamName || "Home"}</h3>

            <div className="score-content">
              <div className="quantity">{home?.score ?? 0}</div>

              {/* Penalty placeholder (can be made dynamic later) */}
              {homePenalty ? (
                <div className="penalty-wrap flex">
                    <div className="penalty-player">#{homePenalty.playerNo}</div>
                    <div className="penalty-time">
                      {homePenalty.remainingMinutes}:
                      {homePenalty.remainingSeconds.toString().padStart(2, "0")}
                      
                      <a className="remove-penalty" onClick={()=>removePenalty(homePenalty._id)}>remove</a>
                    </div>
                  </div>

                ) : (
                 null
                )}
              
              <ul className="box-table">
                <li>
                  <strong>GB</strong><span>{homeStats.groundBall ?? 0}</span>
                </li>

                <li>
                  <strong>Shots</strong>
                  <span>{homeStats.shotOn ?? 0}/{homeStats.shotOff ?? 0}</span>
                </li>

                <li>
                  <strong>Saves</strong>
                  <span>{homeStats.save ?? homeStats.save ?? 0}</span>
                </li>
                {/*
                <li>
                  <strong>Draws</strong>
                  <span>{homeStats.drawW ?? 0}/{homeStats.drawL ?? 0}</span>
                </li>
                  */}
                <li>
                  <strong>TO</strong>
                  <span>{homeStats.turnoverForced ?? 0}/{homeStats.turnoverUnforced ?? 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---------------- AWAY ---------------- */}
        <div className="col-md-6 score-card-innr">
          <div className="score-card">
            <div className="score-icon">
              <img src={game?.awayTeamLogo || iconaway} alt="away icon" />
            </div>

            <h3>{game?.awayTeamName || "Away"}</h3>

            <div className="score-content">
              <div className="quantity">{away?.score ?? 0}</div>

              {/* Penalty placeholder */}
               {awayPenalty ? (
                <div className="penalty-wrap flex">
                    <div className="penalty-player">#{awayPenalty.playerNo}</div>
                    <div className="penalty-time">
                      {awayPenalty.remainingMinutes}:
                      {awayPenalty.remainingSeconds.toString().padStart(2, "0")}
                      <a className="remove-penalty" onClick={()=>removePenalty(homePenalty._id)}>remove</a>
                    </div>
                  </div>

                ) : (
                 null
                )}

              <ul className="box-table">
                <li>
                  <strong>GB</strong><span>{awayStats.groundBall ?? 0}</span>
                </li>

                <li>
                  <strong>Shots</strong>
                  <span>{awayStats.shotOn ?? 0}/{awayStats.shotOff ?? 0}</span>
                </li>

                <li>
                  <strong>Saves</strong>
                  <span>{awayStats.save ?? awayStats.save ?? 0}</span>
                </li>
                {/*
                <li>
                  <strong>Draws</strong>
                  <span>{awayStats.drawW ?? 0}/{awayStats.drawL ?? 0}</span>
                </li>
                  */}
                <li>
                  <strong>TO</strong>
                  <span>{awayStats.turnoverForced ?? 0}/{awayStats.turnoverUnforced ?? 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
