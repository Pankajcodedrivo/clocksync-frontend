import { useEffect, useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg"
import iconclock from "../assets/images/icon-clock.svg"
import iconaway from "../assets/images/icon-away.svg"
import setclock from "../assets/images/clock.svg"
import playbtn from "../assets/images/play-icon.svg"
import plus from "../assets/images/plus.svg"
import minus from "../assets/images/minus.svg"
export default function ScoreKeeperComponent() {
    const [qty, setQty] = useState(1);
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return (
        <>
            <div className="score-board-otr">
                <div className="row m-0 justify-content-center">
                    <div className="col-md-4 score-card-innr p-0">
                        <div className="score-card">
                            <div className="score-icon"><img src={iconngo} alt="" /></div>
                            <h3>Home</h3>
                            <div className="score-content">
                                <div className="quantity">
                                    <button className="qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><img src={minus} alt="" /></button>
                                    <input type="number" value={qty} min="1" onChange={(e) => setQty(Number(e.target.value))} />
                                    <button className="qty-btn" onClick={() => setQty(qty + 1)}><img src={plus} alt="" /></button>
                                </div>
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
                            <div className="score-content pb-0">
                                <div className="quantity">
                                    <button className="qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><img src={minus} alt="" /></button>
                                    <input type="number" value={qty} min="1" onChange={(e) => setQty(Number(e.target.value))} />
                                    <button className="qty-btn" onClick={() => setQty(qty + 1)}><img src={plus} alt="" /></button>
                                </div>
                                <div className="timer">
                                    <span className="digit">{hours[0]}</span>
                                    <span className="digit">{hours[1]}</span>
                                    <span className="colon">:</span>
                                    <span className="digit">{minutes[0]}</span>
                                    <span className="digit">{minutes[1]}</span>
                                </div>
                            </div>
                            <div className="set-clock">
                                <div className="time-select">
                                    <select name="" id="" className="form-control">
                                        <option value="1">Mins.</option>
                                        <option value="2">Mins.</option>
                                        <option value="3">Mins.</option>
                                    </select>
                                    <select name="" id="" className="form-control">
                                        <option value="1">Sec.</option>
                                        <option value="2">Sec.</option>
                                        <option value="3">Sec.</option>
                                    </select>
                                </div>
                                <div className="clock">
                                    Set Clock
                                    <span><img src={setclock} alt="" /></span>
                                </div>
                                <button className="play-btn"><img src={playbtn} alt="" /></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 score-card-innr p-0">
                        <div className="score-card">
                            <div className="score-icon"><img src={iconaway} alt="" /></div>
                            <h3>Away</h3>
                            <div className="score-content">
                                <div className="quantity">
                                    <button className="qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><img src={minus} alt="" /></button>
                                    <input type="number" value={qty} min="1" onChange={(e) => setQty(Number(e.target.value))} />
                                    <button className="qty-btn" onClick={() => setQty(qty + 1)}><img src={plus} alt="" /></button>
                                </div>
                                <ul>
                                    <li>5’ Darrel Bins</li>
                                    <li>7’ Darrel Bins</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-30">
                <button type="button" className="btn btn-primary">Reset Game</button>
            </div>
        </>
    )
}