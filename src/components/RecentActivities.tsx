import bellIcon from "../assets/images/bell.svg";
import deleteIcon from "../assets/images/fluent_delete.svg";

interface ActionItem {
     _id: string;
    type: string;
    team: "home" | "away";
    playerNo: number;
    quarter: number;
    minute: number;
    second: number;
}

interface Props {
    gameStatistics: {
        actions: ActionItem[];
    };
    game: {
        _id:string;
        homeTeamName: string;
        awayTeamName: string;
    };
    socketEmit: (event: string, data: any) => void;  
}

const actionLabels: Record<string, string> = {
    goal: "Goal",
    shot_on: "Shot SOG",
    shot_off: "Shot Off",
    penalty: "Penalty",
    clear_success: "Clear Success",
    ground_ball: "Ground Ball",
    draw_w: "Draw W",
    draw_l: "Draw L",
    to_f: "TO - F",
    to_u: "TO - U"
};

export default function RecentActivities({ gameStatistics, game,socketEmit }: Props) {
    const handleDelete = (action: ActionItem) => {
        socketEmit("deleteAction", { gameId: game._id, actionId: action._id });
    };
    return (
        <div className="recent-activities">
            <div className="recent-activities-top text-center sub-hdr">
                <img src={bellIcon} />
                <h3>Recent Activities</h3>
                <p>Review your recent scores and matches.</p>
            </div>

            <div className="recent-activities-list">
                {[...gameStatistics.actions].reverse()?.map((item, idx) => {
                    const teamName =
                        item.team === "home"
                            ? game.homeTeamName
                            : game.awayTeamName;

                    const displayLabel =
                        actionLabels[item.type] ?? item.type;

                    return (
                        <div key={idx} className="recent-activities-list-item">
                            <div className="left-part">
                                <div className={`team-name ${item.team === "away" ? "gold" : ""}`}>
                                    {teamName}
                                </div>

                                <div className="player-number">
                                    {displayLabel} <span>{(item.playerNo)?`#${item.playerNo}`:null}</span>
                                </div>
                            </div>

                            <div className="right-part">
                                <div className="time-clock">
                                    Q{item.quarter}
                                    <span>
                                        {item.minute.toString().padStart(2, "0")}:{item.second.toString().padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="delete">
                                    <button onClick={() => handleDelete(item)}>
                                        <img src={deleteIcon} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
