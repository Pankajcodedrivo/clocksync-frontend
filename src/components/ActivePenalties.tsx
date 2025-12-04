interface ActivePenaltiesProps {
  gameStatistics: any;
  game: any;
}

export default function ActivePenalties({
  gameStatistics,
  game
}: ActivePenaltiesProps) {

  // Pull penalties from actions instead of gameStatistics.penalties
  const penalties =
    (structuredClone(gameStatistics?.actions ?? [])
      .filter((a: any) => a.type === "penalty")
      .reverse()) ?? [];

  if (penalties.length === 0) {
    return (
      <div className="cmn-box-wrapper">
        <table className="table">
          <tbody>
            <tr>
              <td colSpan={6} className="text-center">
                No active penalties
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="cmn-box-wrapper penalty-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Type</th>
            <th>Player No</th>
            <th>Quarter</th>
            <th>Infraction</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>

        <tbody>
          {penalties.map((p: any, index: number) => {
            const teamName =
              p.team === "home"
                ? game?.homeTeamName
                : game?.awayTeamName;

            // Duration comes from penalty event fields
            const durationSeconds = p.penaltyMinutes * 60 + p.penaltySeconds;

            // Start from game's clock at event time
            const startSeconds = p.minute * 60 + p.second;

            // End time = start time - duration
            let endTime = startSeconds - durationSeconds;
            if (endTime < 0) endTime = 0;

            const endMinute = Math.floor(endTime / 60);
            const endSecond = endTime % 60;

            return (
              <tr key={p._id ?? index}>
                <td>{teamName}</td>
                <td className="text-capitalize">{p.penaltyType}</td>
                <td>
                  <span className="number">#{p.playerNo}</span>
                </td>
                <td><span className="number">Q{p.quarter}</span></td>
                <td>
                  <span className="text-capitalize">{p.infraction}</span>
                </td>
                <td>
                  <span className="time">
                    {String(p.minute).padStart(2, "0")} :{" "}
                    {String(p.second).padStart(2, "0")}
                  </span>
                </td>

                <td>
                  <span className="time">
                    {String(endMinute).padStart(2, "0")} :{" "}
                    {String(endSecond).padStart(2, "0")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}