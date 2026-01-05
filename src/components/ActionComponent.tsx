import hugeiconsAdd from "../assets/images/hugeicons_node-add.svg";
import octiconGoal from "../assets/images/octicon_goal.svg";
import icRoundAdjust from "../assets/images/ic_round-adjust.svg";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";
import checkboxBlank from "../assets/images/mdi_checkbox-blank.svg"
import saveOutline from "../assets/images/light_save-outline.svg";
import user from "../assets/images/lucide_user.svg";
import penaltyIcon from "../assets/images/penaltyicon.svg";
import primeUndo from "../assets/images/prime_undo.svg";

import PenaltyPopupComponent from "./PenaltyPopupComponent";
import PlayerListComponent from "./PlayerListComponent";

import { useState } from "react";
import { showErrorToast } from "../utils/toast/toast";

interface Props {
    game:any,
    running:boolean,
    teamName: string; // "home" or "away"
    socketEmit: (event: string, payload: any) => void;
}

export default function ActionComponent({ game,running,teamName, socketEmit }: Props) {
    const [showPenaltyPopup, setShowPenaltyPopup] = useState(false);
    const [showPlayerList, setShowPlayerList] = useState(false);
    const [selectedEventType, setSelectedEventType] = useState("");
    const resolvedTeamName = teamName === "home" ? game.homeTeamName : game.awayTeamName;
    // map button labels → event types
    const eventMap: any = {
        "Goal": "goal",
        "Shot On": "shot_on",
        "Shot Off": "shot_off",
        "Save": "save",
        "GB": "ground_ball",
        "Draw W": "draw_w",
        "Draw L": "draw_l",
        "TO - F": "to_f",
        "TO - U": "to_u"
    };

    // When a non-penalty button is clicked
    const handleOtherClick = (eventLabel: string) => {
        setSelectedEventType(eventMap[eventLabel]); // convert to event type
        setShowPlayerList(true);
        setShowPenaltyPopup(false);
    };

    // When a non-penalty button is clicked
    const handleWithoutPlayerClick = (eventLabel: string) => {
        if(running){
            socketEmit("addAction", {
                gameId:game._id,
                team: teamName,
                type: eventMap[eventLabel],
            });
        }else{
            showErrorToast("Please start the  timer");
        }
        setShowPlayerList(false);
        setShowPenaltyPopup(false);
    };

    // After selecting a player number
    const handlePlayerSelect = (playerNo: number) => {
        if(running){
            socketEmit("addAction", {
                gameId:game._id,
                team: teamName,
                type: selectedEventType,
                playerNo: playerNo
            });
        }else{
            showErrorToast("Please start the  timer");
        }

        setShowPlayerList(false);
    };

    // When penalty popup returns data
    const handlePenaltySubmit = (penaltyData: any) => {
        if(running){
            socketEmit("addAction", {
                gameId:game._id,
                type: "penalty",
                team: teamName,
                playerNo: penaltyData.player,
                duration: penaltyData.duration,
                releasable: penaltyData.releasable,
                infraction: penaltyData.infraction
            });
        }else{
            showErrorToast("Please start the  timer");
        }
        setShowPenaltyPopup(false);
    };    

  return (
    <>
        <div className="event-action-wrap">
            <div className="event-action">
                <img src={hugeiconsAdd} alt="Add" />
                <div>
                    <h4>{teamName} Events</h4>
                    <p>Explore, connect, and match with top events.</p>
                </div>
            </div>

            <div className="event-action-btn">
            
            {/* Goal */}
            <button className="btn btn-secondary" onClick={() => handleOtherClick("Goal")}>
                <img src={octiconGoal} alt="Goal" /> Goal
            </button>

            {/* Shot On */}
            <button className="btn" onClick={() => handleWithoutPlayerClick("Shot On")}>
                <img src={icRoundAdjust} alt="Shot On" /> Shot On
            </button>

            {/* Shot Off */}
            <button className="btn" onClick={() => handleWithoutPlayerClick("Shot Off")}>
                <img src={crossCircle} alt="Shot Off" /> Shot Off
            </button>

            {/* Save */}
            <button className="btn" onClick={() => handleWithoutPlayerClick("Save")}>
                <img src={saveOutline} alt="Save" /> Save
            </button>

            {/* GB */}
            <button className="btn" onClick={() => handleWithoutPlayerClick("GB")}>
                <img src={user} alt="GB" /> GB
            </button>

            {/* Draw W */}
            
            <button className="btn" onClick={() => handleWithoutPlayerClick("Draw W")}>
                <img src={checkboxBlank} alt="Draw W" /> Draw W
            </button>
            

            {/* Draw L */}
            
            <button className="btn" onClick={() => handleWithoutPlayerClick("Draw L")}>
                <img src={crossCircle} alt="Draw L" /> Draw L
            </button> 

            {/* TO-F */}
            <button className="btn" onClick={() => handleWithoutPlayerClick("TO - F")}>
                <img src={icRoundAdjust} alt="TO - F" /> TO - F
            </button>

            {/* TO-U */}
            <button className="btn" onClick={() => handleWithoutPlayerClick("TO - U")}>
                <img src={crossCircle} alt="TO - U" /> TO - U
            </button>

            {/* Penalty */}
            <button className="btn penalty-btn" onClick={() => setShowPenaltyPopup(true)}>
                <img src={penaltyIcon} alt="Penalty" /> Penalty
            </button>
            {/* green btn */}
            {/* <button className="btn penalty-btn green" onClick={() => setShowPenaltyPopup(true)}>
                <img src={penaltyIcon} alt="Penalty" /> Penalty
            </button> */}
            {/* Undo */}
            <button className="btn undo-btn" onClick={() => socketEmit("undoAction", {gameId:game._id,teamName:teamName})}>
                <img src={primeUndo} alt="Undo" /> Undo
            </button>

            </div>
        </div>
        {/* POPUPS */}
        {showPenaltyPopup && (
            <PenaltyPopupComponent
                teamName={resolvedTeamName}
                onSubmit={handlePenaltySubmit}
                onClose={() => setShowPenaltyPopup(false)}
            />
        )}
        {showPlayerList && (
            <PlayerListComponent
                teamName={resolvedTeamName}
                onSelectPlayer={(num: number | null) => {
                    if (num) handlePlayerSelect(num);
                    else setShowPlayerList(false);
                }}
            />
        )}
    </>
  );
}
