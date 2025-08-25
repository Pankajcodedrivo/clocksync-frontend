export default function GameStatistics() {
    return (
        <div className="cmn-box-wrapper p-36">
            <div className="statictics-wrapper">
                <div className="row statictics-otr align-items-end align-items-md-start">
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>Home</h4>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>Penalties</h4>
                        </div>
                        <p className="green lg">0 <span>-</span> 2</p>
                    </div>
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>Away</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="statictics-wrapper">
                <div className="row statictics-otr">
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">SHOTS</h4>
                        <div className="count-inn gap-10">
                            <p className="blue sm">12 <span>-</span> 8</p>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">SAVES</h4>
                        <div className="count-inn gap-10">
                            <p className="green sm">5 <span>-</span> 7</p>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">FOULS</h4>
                        <div className="count-inn gap-10">
                            <p className="orange sm">3 <span>-</span> 5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}