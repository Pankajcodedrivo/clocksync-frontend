import add1 from "../assets/images/add-1.jpg"
import add2 from "../assets/images/add-2.jpg"
import add3 from "../assets/images/add-3.jpg"
import add4 from "../assets/images/add-4.jpg"
import iconngo from "../assets/images/icon-ngo.svg"
import iconclock from "../assets/images/icon-clock.svg"
import iconcalender from "../assets/images/icon-calender.svg"
import bell from "../assets/images/bell.svg"
import Add from "../components/Add"
import Table from "../components/Table"
import SubHeader from "../components/SubHeader"
export default function Home() {
    return (
        <div className="wrapper">
            <div className="add-sec">
                <div className="container small-container">
                    <div className="row m-0">
                        <div className="col-md-6 p-0">
                            <Add img={add1} />
                        </div>
                        <div className="col-md-6 p-0">
                            <Add img={add2} />
                        </div>
                    </div>
                </div>
            </div>
            <section className="score-board-sec">
                <div className="container small-container">
                    <div className="text-center hdr">
                        <h1>Score Board</h1>
                    </div>
                    <div className="score-board-otr">
                        <div className="row g-5">
                            <div className="col-md-4 score-card-innr">
                                <div className="score-card">
                                    <div className="score-icon"><img src={iconngo} alt="" /></div>
                                    <h3>Brian NGO</h3>
                                    <h2 className="score">1</h2>
                                    <ul>
                                        <li>12’ Henrietta O'Connell</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4 score-card-innr">
                                <div className="score-card">
                                    <div className="score-icon"><img src={iconclock} alt="" /></div>
                                    <h3>Period</h3>
                                    <h2 className="score">1</h2>
                                    <div className="timer">12 : 45</div>
                                </div>
                            </div>
                            <div className="col-md-4 score-card-innr">
                                <div className="score-card">
                                    <div className="score-icon"><img src={iconcalender} alt="" /></div>
                                    <h3>Valerio BTS</h3>
                                    <h2 className="score">2</h2>
                                    <ul>
                                        <li>5’ Darrel Bins</li>
                                        <li>7’ Darrel Bins</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubHeader 
                        image={bell}
                        title="Active Penalties"
                        subtitle="Currently applicable penalties are listed below."
                    />
                    <Table />
                </div>
                <div className="left">
                    <Add img={add3} />
                </div>
                <div className="right">
                    <Add img={add4} />
                </div>
            </section>
        </div>
    )
}