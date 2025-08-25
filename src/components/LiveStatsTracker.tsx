import LiveStats from "../components/LiveStates"
export default function LiveStatsTracker() {
    return (
        <div className="cmn-box-wrapper">
            <div className="traker-wrapper">
                <div className="row g-lg-5 g-2">
                    <div className="col-md-6 traker-innr">
                        <LiveStats title="Home" />
                    </div>
                    <div className="col-md-6 traker-innr">
                        <LiveStats title="AWAY" />
                    </div>
                </div>
            </div>
        </div>
    )
}