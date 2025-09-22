interface ActivePenaltiesProps {
  gameStatistics: any;
  game: any;
  socketEmit?: (event: string, payload: any) => void;
}

export default function ActivePenalties({
  gameStatistics,
  game,
  socketEmit
}: ActivePenaltiesProps) {
  const penalties = gameStatistics?.penalties ?? [];
  const handleRemovePenalty = (penaltyId: string) => {
    // Notify server
    socketEmit?.("removePenalty", { gameId: game?._id, penaltyId });
  };

  if (penalties.length === 0) {
    return (
      <div className="cmn-box-wrapper">
        <table className="table">
          <tbody>
            <tr>
              <td colSpan={5} className="text-center">
                No active penalties
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="cmn-box-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Type</th>
            <th>Player No</th>
            <th>Time</th>
            <th>Start</th>
            <th>End</th>
             {socketEmit && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {penalties.map((penalty: any, index: number) => {
            const teamName =
              penalty.team === "home" ? game?.homeTeamName : game?.awayTeamName;
              let totalStartSeconds = penalty.startMinute * 60 + penalty.startSecond;
              let totalPenaltySeconds = penalty.minutes * 60 + penalty.seconds;
              let endTime = totalStartSeconds - totalPenaltySeconds;

              if (endTime < 0) endTime = 0; // clamp so it doesn’t go negative

              const endMinute = Math.floor(endTime / 60);
              const endSecond = endTime % 60; 

            return (
              <tr key={penalty?._id ?? index}>
                <td>{teamName}</td>
                <td className="text-capitalize">{penalty.type}</td>
                <td>
                  <span className="number">{penalty.playerNo}</span>
                </td>
                <td>
                  <span className="time">
                    {String(penalty.minutes).padStart(2, "0")} :{" "}
                    {String(penalty.seconds).padStart(2, "0")}
                  </span>
                </td>
                <td>
                  <span className="time">
                    {String(penalty.startMinute).padStart(2, "0")} :{" "}
                    {String(penalty.startSecond).padStart(2, "0")}
                  </span>
                </td>
                <td>
                  <span className="time">
                    {String(endMinute).padStart(2, "0")} :{" "}
                    {String(endSecond).padStart(2, "0")}
                  </span>
                </td>
                {socketEmit && (
                  <td>
                    {penalty?._id && (
                      <a href="#" className="remove-btn"
                        onClick={() => handleRemovePenalty(penalty._id)}
                      >
                        Remove
                      </a>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
