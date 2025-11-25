import LiveStats from "../components/LiveStates"
type LiveStatsTrackerProps = {
  gameStatistics: any;
  game:any
};
export default function LiveStatsTracker({gameStatistics,game}:LiveStatsTrackerProps) {
    return (
        <div className="cmn-box-wrapper">
            <div className="traker-wrapper">
                <div className="row g-lg-5 g-2">
                    <div className="col-md-6 traker-innr">
                        <LiveStats title="home" actions={gameStatistics?.actions}  name={game?.homeTeamName} />
                    </div>
                    <div className="col-md-6 traker-innr">
                        <LiveStats title="away"  actions={gameStatistics?.actions}  name={game?.awayTeamName}/>
                    </div>
                </div>
            </div>
        </div>
    )
}