import React, { useState } from "react";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";

interface PlayerListProps {
  teamName: any;
  onSelectPlayer: (num: number | null) => void;
}

const PlayerListComponent: React.FC<PlayerListProps> = ({ teamName, onSelectPlayer }) => {
  const [typeNumber, setTypeNumber] = useState<string>("");

  // Full list, no filtering
  const players: number[] = Array.from({ length: 100 }, (_, i) => i);
  const filteredPlayers = players; // removed filtering

  const handleInsert = () => {
    if (typeNumber.trim() === "") return;

    const num = Number(typeNumber);
    if (!isNaN(num)) {
      onSelectPlayer(num); // send typed number
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="close-popup" onClick={() => onSelectPlayer(null)}>
          <img src={crossCircle} alt="Close" />
        </div>

        <h3>Select Player For {teamName}</h3>

        <div className="player-list">
          {filteredPlayers.map((player) => (
            <div
              key={player}
              className="player-item"
              onClick={() => onSelectPlayer(player)}
            >
              <div className="player-item-innr">{player}</div>
            </div>
          ))}
        </div>

        <div className="search-player type-input">
          <input
            type="number"
            placeholder="Enter the player number..."
            value={typeNumber}
            onChange={(e) => setTypeNumber(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleInsert}>
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerListComponent;
