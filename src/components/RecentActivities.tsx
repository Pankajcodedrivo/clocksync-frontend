import bellIcon from "../assets/images/bell.svg"
import deleteIcon from "../assets/images/fluent_delete.svg";
interface Props {
  gameStatistics: any;
  game: any;
}
export default function RecentActivities({ gameStatistics,game }: Props) {
    console.log(gameStatistics);
    console.log(game);

    return (
        <div className="cmn-box recent-activities">
            <div className="recent-activities-top">
                <img src={bellIcon} />
                <h2>Recent Activities</h2>
                <p>Review your recent scores and matches.</p>
            </div>
            <div className="recent-activities-list">
                <div className="recent-activities-list-item">
                    <div className="team-name">
                        Navy
                    </div>
                    <div className="player-number">
                        Goal <span>#8</span>
                    </div>
                    <div className="time-clock">
                        Q1<span>10:30</span>
                    </div>
                    <div className="delete">
                       <button>delete</button>
                    </div>
                </div>
                <div className="recent-activities-list-item">
                    <div className="team-name">
                        Navy
                    </div>
                    <div className="player-number">
                        Goal <span>#8</span>
                    </div>
                    <div className="time-clock">
                        Q1<span>10:30</span>
                    </div>
                    <div className="delete">
                       <button><img src={deleteIcon}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}