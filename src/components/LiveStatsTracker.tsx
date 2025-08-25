import LiveStats from "../components/LiveStates"
export default function LiveStatsTracker() {
    return (
        <div className="cmn-box-wrapper">
            <div className="traker-wrapper">
                <div className="row g-5">
                    <div className="col-md-6">
                        <LiveStats title="Home" />
                    </div>
                    <div className="col-md-6">
                        <LiveStats title="AWAY" />
                    </div>
                </div>
            </div>
        </div>
    )
}