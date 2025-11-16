import bellIcon from "../assets/images/bell.svg"
import deleteIcon from "../assets/images/fluent_delete.svg";
interface Props {
    gameStatistics: any;
    game: any;
}
export default function RecentActivities({ gameStatistics, game }: Props) {
    console.log(gameStatistics);
    console.log(game);

    return (
        <div className="recent-activities">
            <div className="recent-activities-top text-center sub-hdr">
                <img src={bellIcon} />
                <h3>Recent Activities</h3>
                <p>Review your recent scores and matches.</p>
            </div>
            <div className="recent-activities-list">
                <div className="recent-activities-list-item">
                    <div className="left-part">
                        <div className="team-name">
                            Navy
                        </div>
                        <div className="player-number">
                            Goal <span>#8</span>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="time-clock">
                            Q1<span>10:30</span>
                        </div>
                        <div className="delete">
                            <button><img src={deleteIcon} /></button>
                        </div>
                    </div>
                </div>
                <div className="recent-activities-list-item">
                    <div className="left-part">
                        <div className="team-name gold">
                            Gold
                        </div>
                        <div className="player-number">
                            Penalty start <span>#8</span>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="time-clock">
                            Q1<span>10:30</span>
                        </div>
                        <div className="delete">
                            <button><img src={deleteIcon} /></button>
                        </div>
                    </div>
                </div>
                <div className="recent-activities-list-item">
                    <div className="left-part">
                        <div className="team-name">
                            Navy
                        </div>
                        <div className="player-number">
                            Goal <span>#8</span>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="time-clock">
                            Q1<span>10:30</span>
                        </div>
                        <div className="delete">
                            <button><img src={deleteIcon} /></button>
                        </div>
                    </div>
                </div>
                <div className="recent-activities-list-item">
                    <div className="left-part">
                        <div className="team-name">
                            Navy
                        </div>
                        <div className="player-number">
                            Clear success <span>#8</span>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="time-clock">
                            Q1<span>10:30</span>
                        </div>
                        <div className="delete">
                            <button><img src={deleteIcon} /></button>
                        </div>
                    </div>
                </div>
                <div className="recent-activities-list-item">
                    <div className="left-part">
                        <div className="team-name">
                            Navy
                        </div>
                        <div className="player-number">
                            Ground ball <span>#8</span>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="time-clock">
                            Q1<span>10:30</span>
                        </div>
                        <div className="delete">
                            <button><img src={deleteIcon} /></button>
                        </div>
                    </div>
                </div>
                <div className="recent-activities-list-item">
                    <div className="left-part">
                        <div className="team-name gold">
                            Gold
                        </div>
                        <div className="player-number">
                            Shot sog <span>#8</span>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="time-clock">
                            Q1<span>10:30</span>
                        </div>
                        <div className="delete">
                            <button><img src={deleteIcon} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}