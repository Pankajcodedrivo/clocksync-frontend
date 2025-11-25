import { useState } from "react";
import goal from "../assets/images/goal.svg";
import penalty from "../assets/images/penalty.svg";

interface AddProps {
  title: "home" | "away";       // which team this card represents
  actions?: any[];              // ALL game actions passed down
  name: any;                    // team name
}

export default function LiveStatsTracker({
  title,
  actions = [],
  name,
}: AddProps) {
  const [activeTab, setActiveTab] = useState<"goal" | "penalty">("goal");

  // Filter actions for THIS team
  const teamActions = actions.filter(
    (a: any) => a.team?.toLowerCase() === title
  );
  // Extract only goals for this team
  const teamGoals = [...teamActions.filter((a: any) => a.type === "goal")].reverse();

  // Extract only penalties for this team
  const teamPenalties = [...teamActions.filter((a: any) => a.type === "penalty")].reverse();

  // Which list to show
  const events = activeTab === "goal" ? teamGoals : teamPenalties;

  return (
    <>
      <div className="traker-top">
        <div
          className={`btn btn-secendary ${activeTab === "goal" ? "active" : ""}`}
          onClick={() => setActiveTab("goal")}
        >
          <span>
            <img src={goal} alt="goal" />
          </span>
          Goal
        </div>

        <h6>{name ? name.toUpperCase() : ""}</h6>

        <div
          className={`btn btn-primary ${activeTab === "penalty" ? "active" : ""}`}
          onClick={() => setActiveTab("penalty")}
        >
          <span>
            <img src={penalty} alt="penalty" />
          </span>
          Penalty
        </div>
      </div>

      <ul className="traker-list">
        {events.length === 0 ? (
          <li className="no-datatrac">
            <div className="traker-content">
              <p>{activeTab === "goal" ? "No goals yet" : "No penalties yet"}</p>
            </div>
          </li>
        ) : activeTab === "goal" ? (
          events.map((g: any, i: number) => (
            <li key={i}>
              <div className="traker-icon green">
                <img src={goal} alt="goal" />
              </div>
              <div className="traker-content">
                <h5>Goal by #{g.playerNo}</h5>
                <p>
                  {title.toUpperCase()} -{" "}
                  {String(g.minute).padStart(2, "0")}:
                  {String(g.second).padStart(2, "0")}
                </p>
              </div>
            </li>
          ))
        ) : (
          events.map((p: any, i: number) => (
            <li key={i}>
              <div className="traker-icon orange">
                <img src={penalty} alt="penalty" />
              </div>
              <div className="traker-content text-capitalize">
                <h5>
                  {p.penaltyType ?? p.type} - #{p.playerNo}
                </h5>
                <p>
                  {title.toUpperCase()} -{" "}
                  {String(p.minute).padStart(2, "0")}:
                  {String(p.second).padStart(2, "0")}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
