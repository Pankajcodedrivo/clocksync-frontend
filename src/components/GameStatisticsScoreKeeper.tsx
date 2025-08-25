import plus from "../assets/images/plus.svg"
import minus from "../assets/images/minus.svg"

export default function GameStatisticsScoreKeeper() {
    return (
        <div className="cmn-box-wrapper p-36">
            <div className="statictics-wrapper">
                <div className="row statictics-otr align-items-end align-items-md-start">
                    <div className="col-4  statictics-innr">
                        <div className="count-inn">
                            <span className="qty-btn"><img src={minus} alt="" /></span>
                            <h4>Home</h4>
                            <span className="qty-btn"><img src={plus} alt="" /></span>
                        </div>
                    </div>
                    <div className="col-4  statictics-innr">
                        <div className="count-inn">
                            <h4>Penalties</h4>
                        </div>
                        <p className="green lg">0 <span>-</span> 2</p>
                    </div>
                    <div className="col-4  statictics-innr">
                        <div className="count-inn">
                            <span className="qty-btn"><img src={minus} alt="" /></span>
                            <h4>Away</h4>
                            <span className="qty-btn"><img src={plus} alt="" /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="statictics-wrapper bottom">
                <div className="row statictics-otr">
                    <div className="col-md-4 statictics-innr">
                        <h4 className="sm">SHOTS</h4>
                        <div className="count-inn gap-10">
                            <div className="qntity-info">
                                <span className="qty-btn sm"><img src={minus} alt="" /></span>
                                <span className="qty-btn sm"><img src={plus} alt="" /></span>
                            </div>
                            <p className="blue sm">12 <span>-</span> 8</p>
                            <div className="qntity-info">
                                <span className="qty-btn sm"><img src={minus} alt="" /></span>
                                <span className="qty-btn sm"><img src={plus} alt="" /></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 statictics-innr">
                        <h4 className="sm">SAVES</h4>
                        <div className="count-inn gap-10">
                            <div className="qntity-info">
                                <span className="qty-btn sm"><img src={minus} alt="" /></span>
                                <span className="qty-btn sm"><img src={plus} alt="" /></span>
                            </div>
                            <p className="green sm">5 <span>-</span> 7</p>
                            <div className="qntity-info">
                                <span className="qty-btn sm"><img src={minus} alt="" /></span>
                                <span className="qty-btn sm"><img src={plus} alt="" /></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 statictics-innr">
                        <h4 className="sm">FOULS</h4>
                        <div className="count-inn gap-10">
                            <div className="qntity-info">
                                <span className="qty-btn sm"><img src={minus} alt="" /></span>
                                <span className="qty-btn sm"><img src={plus} alt="" /></span>
                            </div>
                            <p className="orange sm">3 <span>-</span> 5</p>
                            <div className="qntity-info">
                                <span className="qty-btn sm"><img src={minus} alt="" /></span>
                                <span className="qty-btn sm"><img src={plus} alt="" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}