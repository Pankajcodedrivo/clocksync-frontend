import React, { useState } from "react";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";

interface PlayerListProps {
  teamName:any,
  onSelectPlayer: (num: number | null) => void;
}

const PlayerListComponent: React.FC<PlayerListProps> = ({teamName, onSelectPlayer }) => {
  const [search, setSearch] = useState<string>("");
  const players: number[] = Array.from({ length: 100 }, (_, i) => i);

  const filteredPlayers = players.filter((player) =>
    player.toString().includes(search)
  );

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="close-popup" onClick={() => onSelectPlayer(null)}>
          <img src={crossCircle} alt="Close" />
        </div>
        <h3>Select Player - {teamName}</h3>

        <div className="search-player">
          <input
            type="number"
            placeholder="Search player number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="player-list">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div
                key={player}
                className="player-item"
                onClick={() => onSelectPlayer(player)}
              >
                {player}
              </div>
            ))
          ) : (
            <p className="no-results">No players found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerListComponent;
