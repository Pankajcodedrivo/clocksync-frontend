interface Props {
  gameStatistics: any;
  game: any;
}
export default function GameStatistics({ gameStatistics,game }: Props) {
    const home = gameStatistics?.homeTeam;
    const away = gameStatistics?.awayTeam;

    const homeStats = home?.stats || {};
    const awayStats = away?.stats || {};
    return (
        <div className="cmn-box-wrapper p-36">
            <div className="statictics-wrapper">
                <div className="row statictics-otr align-items-end align-items-md-start">
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>{game?.homeTeamName}</h4>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>GROUND BALLS</h4>
                        </div>
                        <p className="green lg">{homeStats.groundBall ?? 0} <span>-</span> {awayStats.groundBall ?? 0}</p>
                    </div>
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>{game?.awayTeamName}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="statictics-wrapper">
                <div className="row statictics-otr">
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">SHOTS</h4>
                        <div className="count-inn gap-10">
                            <p className="blue sm">{homeStats.shotOn ?? 0}/{homeStats.shotOff ?? 0} <span>-</span> {awayStats.shotOn ?? 0}/{awayStats.shotOff ?? 0}</p>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">SAVES</h4>
                        <div className="count-inn gap-10">
                            <p className="green sm">{homeStats.save ?? homeStats.save ?? 0} <span>-</span> {awayStats.save ?? awayStats.save ?? 0}</p>
                        </div>
                    </div>
                    {/*<div className="col-3 statictics-innr">
                        <h4 className="sm">Draws</h4>
                        <div className="count-inn gap-10">
                            <p className="orange sm"> {homeStats.drawW ?? 0}/{homeStats.drawL ?? 0} <span>-</span> {awayStats.drawW ?? 0}/{awayStats.drawL ?? 0}</p>
                        </div>
                    </div>
                    */}
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">TO</h4>
                        <div className="count-inn gap-10">
                            <p className="blue sm">{homeStats.turnoverForced ?? 0}/{homeStats.turnoverUnforced ?? 0} <span>-</span> {awayStats.turnoverForced ?? 0}/{awayStats.turnoverUnforced ?? 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}