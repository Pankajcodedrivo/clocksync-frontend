import hugeiconsAdd from "../assets/images/hugeicons_node-add.svg";
import octiconGoal from "../assets/images/octicon_goal.svg";
import icRoundAdjust from "../assets/images/ic_round-adjust.svg";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";
import saveOutline from "../assets/images/light_save-outline.svg";
import user from "../assets/images/lucide_user.svg";
import checkboxBlank from "../assets/images/mdi_checkbox-blank.svg";
import penaltyIcon from "../assets/images/penaltyicon.svg";
import primeUndo from "../assets/images/prime_undo.svg";
import PenaltyPopupComponent from "./PenaltyPopupComponent";
import PlayerListComponent from "./PlayerListComponent";
import { useState } from "react";

interface Props {
  gameStatistics: any;
  game: any;
  teamName:any
}

export default function ActionComponent({ gameStatistics,game,teamName }: Props) {
    console.log(gameStatistics);
    console.log(game);
    const [showPenaltyPopup, setShowPenaltyPopup] = useState(false);
    const [showPlayerList, setShowPlayerList] = useState(false);

    const handlePenaltyClick = () => {
        setShowPenaltyPopup(true);
        setShowPlayerList(false);
    };

    const handleOtherClick = () => {
        setShowPlayerList(true);
        setShowPenaltyPopup(false);
    };

    return (
        <>
            <div className="event-action-wrap">
                <div className="event-action">
                    <img src={hugeiconsAdd} alt="Add" />
                    <h4>{teamName} Events</h4>
                    <p>Explore, connect, and match with top events.</p>
                </div>

                <div className="event-action-btn">
                <button className="btn btn-secondary" onClick={handleOtherClick}>
                    <img src={octiconGoal} alt="Goal" /> Goal
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={icRoundAdjust} alt="Shot On" /> Shot On
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={crossCircle} alt="Shot Off" /> Shot Off
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={saveOutline} alt="Save" /> Save
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={user} alt="GB" /> GB
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={checkboxBlank} alt="Draw W" /> Draw W
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={crossCircle} alt="Draw L" /> Draw L
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={icRoundAdjust} alt="TO - F" /> TO - F
                </button>
                <button className="btn" onClick={handleOtherClick}>
                    <img src={crossCircle} alt="TO - U" /> TO - U
                </button>

                {/* Penalty button */}
                <button className="btn penalty-btn" onClick={handlePenaltyClick}>
                    <img src={penaltyIcon} alt="Penalty" /> Penalty
                </button>

                {/* Undo */}
                <button className="btn undo-btn">
                    <img src={primeUndo} alt="Undo" /> Undo
                </button>
                </div>
            </div>

            {/* Conditional Popups */}
            {showPenaltyPopup && (
                <PenaltyPopupComponent teamName={teamName} />
            )}

            {showPlayerList && (
                <PlayerListComponent onSelectPlayer={() => setShowPlayerList(false)} />
            )}
        </>
    );
}