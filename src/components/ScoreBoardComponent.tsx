import { useEffect, useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg"
import iconclock from "../assets/images/icon-clock.svg"
import iconaway from "../assets/images/icon-away.svg"
export default function ScoreBoardComponent() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return (
        <div className="score-board-otr">
            <div className="row m-0 justify-content-center">
                <div className="col-md-4 score-card-innr p-0">
                    <div className="score-card">
                        <div className="score-icon"><img src={iconngo} alt="" /></div>
                        <h3>Home</h3>
                        <div className="score-content">
                            <h2 className="score">1</h2>
                            <ul>
                                <li>12’ Henrietta O'Connell</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 score-card-innr p-0">
                    <div className="score-card">
                        <div className="score-icon"><img src={iconclock} alt="" /></div>
                        <h3>Quarters</h3>
                        <div className="score-content">
                            <h2 className="score">1</h2>
                            <div className="timer">
                                <span className="digit">{hours[0]}</span>
                                <span className="digit">{hours[1]}</span>
                                <span className="colon">:</span>
                                <span className="digit">{minutes[0]}</span>
                                <span className="digit">{minutes[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 score-card-innr p-0">
                    <div className="score-card">
                        <div className="score-icon"><img src={iconaway} alt="" /></div>
                        <h3>Away</h3>
                        <div className="score-content">
                            <h2 className="score">2</h2>
                            <ul>
                                <li><em>5</em>’ Darrel Bins</li>
                                <li><em>7’</em> Darrel Bins</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}