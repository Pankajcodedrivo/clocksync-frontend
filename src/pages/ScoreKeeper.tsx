import ActivePenalties from "../components/ActivePenalties";
import GameStatisticsScoreKeeper from "../components/GameStatisticsScoreKeeper";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreKeeperComponent from "../components/ScoreKeeperComponent";
export default function ScoreKeeper() {
    return (
        <div className="wrapper">
            <section className="score-board-sec">
                <div className="container small-container">
                    <div className="score-top cmn-box pt-30">
                        <div className="text-center hdr">
                            <h1>Score Keeper</h1>
                        </div>
                        <ScoreKeeperComponent />
                    </div>
                    <div className="cmn-box">
                        <h2>Add Scorer</h2>
                        <div className="information-form-wrapper text-center">
                            <div className="information-form add-scorer">
                                <select name="" id="" className="form-control ngo-select">
                                    <option value="1">Home</option>
                                    <option value="2">Home</option>
                                    <option value="3">Home</option>
                                </select>
                                <input type="text" placeholder="Player name" className="form-control name" />
                                <select name="" id="" className="form-control mins-select">
                                    <option value="1">Mins.</option>
                                    <option value="2">Mins.</option>
                                    <option value="3">Mins.</option>
                                </select>
                                <button type="submit" className="btn btn-primary">Add Scorer</button>
                            </div>
                        </div>
                    </div>
                    <div className="cmn-box">
                        <h2>Add Penalties</h2>
                        <div className="information-form-wrapper text-center">
                            <div className="information-form add-scorer">
                                <select name="" id="" className="form-control ngo-select">
                                    <option value="1">Home</option>
                                    <option value="2">Home</option>
                                    <option value="3">Home</option>
                                </select>
                                <input type="text" placeholder="Player name" className="form-control name" />
                                <div className="time-select">
                                    <select name="" id="" className="form-control mins-select">
                                        <option value="1">Mins.</option>
                                        <option value="2">Mins.</option>
                                        <option value="3">Mins.</option>
                                    </select>
                                    <select name="" id="" className="form-control mins-select">
                                        <option value="1">Sec.</option>
                                        <option value="2">Sec.</option>
                                        <option value="3">Sec.</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Penalties</button>
                            </div>
                        </div>
                    </div>
                    <div className="cmn-box">
                        <h2>Active Penalties</h2>
                        <ActivePenalties />
                    </div>
                    <div className="cmn-box">
                        <h2>Game Statistics</h2>
                        <GameStatisticsScoreKeeper />
                    </div>
                    <div className="cmn-box">
                        <h2>Live Stats Tracker</h2>
                        <LiveStatsTracker />
                    </div>
                </div>
            </section>
        </div>
    )
}