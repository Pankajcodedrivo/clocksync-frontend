import React, { useState } from "react";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";
import PlayerListComponent from "./PlayerListComponent";

interface PenaltyPopupProps {
  teamName: string;
  onSubmit: (data: any) => void;      // ⬅ returns penalty data to parent
  onClose: () => void;                // ⬅ closes popup
}

const PenaltyPopupComponent: React.FC<PenaltyPopupProps> = ({
  teamName,
  onSubmit,
  onClose
}) => {
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [releasable, setReleasable] = useState<boolean>(false);
  const [infraction, setInfraction] = useState<string>("slashing");

  const handleAddTime = (seconds: number) => {
    setDuration((prev) => prev + seconds);
  };

  const formatDuration = (): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const submitPenalty = () => {
    if (selectedPlayer === null) {
      alert("Please select a player");
      return;
    }

    const penaltyData = {
      team: teamName,
      player: selectedPlayer,
      duration,
      releasable,
      infraction,
    };

    onSubmit(penaltyData);    // ⬅ send penalty data to ActionComponent
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">

          {/* Close button */}
          <div className="close-popup" onClick={onClose}>
            <img src={crossCircle} alt="Close" />
          </div>

          <h3>Add Penalty – {teamName}</h3>

          <div className="penalty-wrap">

            {/* Player Select */}
            <div className="penalty-input-wrap">
              <label>Player Number</label>
              <div className="player-select">
                <button className="btn btn-primary" onClick={() => setShowPlayerList(true)}>
                  {selectedPlayer !== null ? `#${selectedPlayer}` : "Select Player"}
                </button>
              </div>
            </div>

            {/* Duration */}
            <div className="penalty-input-wrap">
              <label>Duration</label>
              <div className="duration-wrap">
                <button onClick={() => handleAddTime(30)}>+30</button>
                <button onClick={() => handleAddTime(60)}>+1:00</button>
                <button onClick={() => handleAddTime(120)}>+2:00</button>
              </div>
              <span className="duration-number">{formatDuration()}</span>
            </div>

            {/* Releasable Toggle */}
            <div className="penalty-input-wrap switch">
              <label>Releasable</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={releasable}
                  onChange={() => setReleasable(!releasable)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Infraction */}
            <div className="penalty-input-wrap">
              <label>Infraction</label>
              <select
                value={infraction}
                onChange={(e) => setInfraction(e.target.value)}
              >
                <option value="slashing">Slashing</option>
                <option value="holding">Holding</option>
                <option value="pushing">Pushing</option>
                <option value="illegal-body-check">Illegal Body Check</option>
                <option value="interference">Interference</option>
                <option value="cross-check">Cross-Check</option>
                <option value="yellow card">Yellow Card</option>
                <option value="red card">Red Card</option>
              </select>
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary add-penalty" onClick={submitPenalty}>
              Add Penalty
            </button>

          </div>
        </div>
      </div>

      {/* Player List Popup */}
      {showPlayerList && (
        <PlayerListComponent teamName="Penalty"
          onSelectPlayer={(num: number | null) => {
            if (num !== null) setSelectedPlayer(num);
            setShowPlayerList(false);
          }}
        />
      )}
    </>
  );
};

export default PenaltyPopupComponent;