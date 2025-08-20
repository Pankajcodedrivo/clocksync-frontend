import React, { useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg"
import iconclock from "../assets/images/icon-clock.svg"
import iconcalender from "../assets/images/icon-calender.svg"
import bell from "../assets/images/bell.svg"
import penalties from "../assets/images/penalties-icon.svg"
import scorer from "../assets/images/scorer-icon.svg"
import setclock from "../assets/images/clock.svg"
import playbtn from "../assets/images/play-icon.svg"
import plus from "../assets/images/plus.svg"
import minus from "../assets/images/minus.svg"
import Table from "../components/Table"
import SubHeader from "../components/SubHeader"
export default function ScoreKeeper() {
  const [qty, setQty] = useState(1);
    return (
        <div className="wrapper">
            <section className="score-board-sec">
                <div className="container small-container">
                    <div className="text-center hdr">
                        <h1>Score Keeper</h1>
                    </div>
                    <div className="score-board-otr score-keeper mb-50">
                        <div className="row g-5">
                            <div className="col-md-4 score-card-innr">
                                <div className="score-card">
                                    <div className="score-icon"><img src={iconngo} alt="" /></div>
                                    <h3>Brian NGO</h3>
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
                            <div className="col-md-4 score-card-innr">
                                <div className="score-card">
                                    <div className="score-icon"><img src={iconclock} alt="" /></div>
                                    <h3>Period</h3>
                                    <div className="quantity">
                                        <button className="qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><img src={minus} alt="" /></button>
                                        <input type="number" value={qty} min="1" onChange={(e) => setQty(Number(e.target.value))} />
                                        <button className="qty-btn" onClick={() => setQty(qty + 1)}><img src={plus} alt="" /></button>
                                    </div>
                                    <div className="timer">12 : 45</div>
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
                            <div className="col-md-4 score-card-innr">
                                <div className="score-card">
                                    <div className="score-icon"><img src={iconcalender} alt="" /></div>
                                    <h3>Valerio BTS</h3>
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
                    <SubHeader
                        image={scorer}
                        title="Add Scorer"
                        subtitle="Add a player’s scoring information here."
                    />
                    <div className="information-form-wrapper text-center mb-50">
                        <div className="information-form add-scorer">
                            <select name="" id="" className="form-control ngo-select">
                                <option value="1">Brian NGO</option>
                                <option value="2">Brian NGO</option>
                                <option value="3">Brian NGO</option>
                            </select>
                            <input type="text" placeholder="Enter player name" className="form-control name" />
                            <select name="" id="" className="form-control mins-select">
                                <option value="1">Mins.</option>
                                <option value="2">Mins.</option>
                                <option value="3">Mins.</option>
                            </select>
                            <button type="submit" className="btn btn-primary">Add Scorer</button>
                        </div>
                    </div>
                    <SubHeader
                        image={penalties}
                        title="Add Penalties"
                        subtitle="Currently applicable penalties are listed below."
                    />
                    <div className="information-form-wrapper text-center mb-50">
                        <div className="information-form add-scorer">
                            <select name="" id="" className="form-control ngo-select">
                                <option value="1">Brian NGO</option>
                                <option value="2">Brian NGO</option>
                                <option value="3">Brian NGO</option>
                            </select>
                            <input type="text" placeholder="Enter player name" className="form-control name" />
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
                            <button type="submit" className="btn btn-primary">Add Penalty</button>
                        </div>
                    </div>
                    <SubHeader
                        image={bell}
                        title="Active Penalties"
                        subtitle="Currently applicable penalties are listed below."
                    />
                    <Table />
                </div>
            </section>
        </div>
    )
}