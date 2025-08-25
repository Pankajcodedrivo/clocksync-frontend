import add1 from "../assets/images/add-1.jpg"
import add3 from "../assets/images/add-3.jpg"
import add4 from "../assets/images/add-4.jpg"
import Add from "../components/Add"
import ActivePenalties from "../components/ActivePenalties"
import GameStatistics from "../components/GameStatistics"
import LiveStatsTracker from "../components/LiveStatsTracker"
import ScoreBoardComponent from "../components/ScoreBoardComponent";
export default function Home() {
    return (
        <div className="wrapper">
            <div className="add-sec">
                <div className="container small-container">
                    <div className="add-otr">
                        <Add img={add1} />
                    </div>
                </div>
            </div>
            <section className="score-board-sec">
                <div className="container small-container">
                    <div className="score-top">
                        <div className="text-center hdr">
                            <h1>Score Board</h1>
                        </div>
                        <ScoreBoardComponent />
                    </div>
                    <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
                        <div className="add-otr">
                            <Add img={add1} />
                        </div>
                    </div>
                    <div className="cmn-box">
                        <h2>Active Penalties</h2>
                        <ActivePenalties />
                    </div>
                    <div className="cmn-box">
                        <h2>Game Statistics</h2>
                        <GameStatistics />
                    </div>

                    <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
                        <div className="add-otr">
                            <Add img={add1} />
                        </div>
                    </div>
                    <div className="cmn-box">
                        <h2>Live Stats Tracker</h2>
                        <LiveStatsTracker />
                    </div>
                </div>
                <div className="left d-none d-xl-block">
                    <Add img={add3} />
                </div>
                <div className="right d-none d-xl-block">
                    <Add img={add4} />
                </div>
            </section>
        </div>
    )
}