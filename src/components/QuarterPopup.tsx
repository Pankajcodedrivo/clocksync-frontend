import React, { useState } from "react";
import crossCircle from "../assets/images/mdi_cross-circle-outline.svg";
import { showErrorToast } from "../utils/toast/toast";

interface QuarterPopupProps {
  onclosePopup: () => void;
  socketEmit: (event: string, data: any) => void;
  gameId: string;
}

const QuarterPopup: React.FC<QuarterPopupProps> = ({ onclosePopup, socketEmit, gameId }) => {
  const [quarter, setQuarter] = useState("");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const handleSetClock = () => {
    // Validation
    if (!quarter) {
      showErrorToast("Please select a quarter.");
      return;
    }

    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
      showErrorToast("Time cannot be 00:00.");
      return;
    }
    socketEmit("setClock", {
      gameId,
      quarter: Number(quarter),
      minutes: Number(minutes),
      seconds: Number(seconds),
    });

    onclosePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="close-popup" onClick={onclosePopup}>
          <img src={crossCircle} alt="Close" />
        </div>

        <h3>Set Quarter & Time</h3>
        <div className="search-player">
          <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
            <option value="">quarter</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="timepopup">
          <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>{i} Min</option>
            ))}
          </select>

          <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>{i} Sec</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary add-penalty" onClick={handleSetClock}>
          Set Quarter & Time
        </button>
      </div>
    </div>
  );
};

export default QuarterPopup;
