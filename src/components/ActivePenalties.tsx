interface ActivePenaltiesProps {
  gameStatistics: any;
  game: any;
  socketEmit: (event: string, payload: any) => void;
  setGameStatistics: React.Dispatch<React.SetStateAction<any>>;
}

export default function ActivePenalties({
  gameStatistics,
  game,
  socketEmit,
  setGameStatistics,
}: ActivePenaltiesProps) {
  const penalties = gameStatistics?.penalties ?? [];

  const handleRemovePenalty = (penaltyId: string) => {
    // Remove from local state
    setGameStatistics((prev: any) => ({
      ...prev,
      penalties: prev.penalties.filter((p: any) => p._id !== penaltyId),
    }));

    // Notify server
    socketEmit("removePenalty", { gameId: game?.id, penaltyId });
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
            <th />
          </tr>
        </thead>
        <tbody>
          {penalties.map((penalty: any, index: number) => {
            const teamName =
              penalty.team === "home" ? game?.homeTeamName : game?.awayTeamName;

            return (
              <tr key={penalty?._id ?? index}>
                <td>{teamName}</td>
                <td>{penalty.type}</td>
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
                  {penalty?._id && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemovePenalty(penalty?._id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
