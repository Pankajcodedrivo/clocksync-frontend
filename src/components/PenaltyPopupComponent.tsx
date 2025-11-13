import React, { useState } from "react";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";
import PlayerListComponent from "./PlayerListComponent";

interface PenaltyPopupProps {
  teamName: string;
}

const PenaltyPopupComponent: React.FC<PenaltyPopupProps> = ({ teamName }) => {
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [releasable, setReleasable] = useState<boolean>(false);

  const handleAddTime = (seconds: number) => {
    setDuration((prev) => prev + seconds);
  };

  const formatDuration = (): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <div className="close-popup">
            <img src={crossCircle} alt="Close" />
          </div>

          <h3>Add Penalty – {teamName}</h3>

          <div className="penalty-wrap">
            {/* Player Select */}
            <div className="penalty-input-wrap">
              <label>Player Number</label>
              <div className="player-select">
                <button onClick={() => setShowPlayerList(true)}>
                  {selectedPlayer !== null
                    ? `#${selectedPlayer}`
                    : "Select Player"}
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
              <span>{formatDuration()}</span>
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
              <select>
                <option value="slashing">Slashing</option>
                <option value="holding">Holding</option>
                <option value="pushing">Pushing</option>
                <option value="illegal-body-check">
                  Illegal Body Check
                </option>
                <option value="interference">Interference</option>
                <option value="cross-check">Cross-Check</option>
                <option value="yellow card">Yellow Card</option>
                <option value="red card">Red Card</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Player List Popup */}
      {showPlayerList && (
        <PlayerListComponent
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