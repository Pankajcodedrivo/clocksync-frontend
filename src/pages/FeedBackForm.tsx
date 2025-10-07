import { useState } from "react";

import zapImg from "../assets/images/icon/lightning.svg";
import gamepadImg from "../assets/images/icon/console.svg";
import eyeImg from "../assets/images/icon/cartoon-eyes.svg";
import turtleImg from "../assets/images/icon/turtle.svg";
import messageImg from "../assets/images/icon/messenger.svg";
import thumbsUpImg from "../assets/images/icon/thumbs-up.svg";
import thumbsDownImg from "../assets/images/icon/negative-vote.svg";
import shrugImg from "../assets/images/icon/shrug.svg";
import medalImg from "../assets/images/icon/badge.svg";
import megaphoneImg from "../assets/images/icon/megaphone.svg";
import xImg from "../assets/images/icon/close.svg";
import starImg from "../assets/images/icon/star.svg";
import starEmptyImg from "../assets/images/icon/star-empty.svg";

export default function ClockSynkFeedback() {
  const [leavingReason, setLeavingReason] = useState<string>("");
  const [otherText, setOtherText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [noticedAds, setNoticedAds] = useState<string>("");
  const [adSpot, setAdSpot] = useState<string[]>([]);
  const [involvement, setInvolvement] = useState<string>("");

  const stars = [1, 2, 3, 4, 5];

  const toggleAdSpot = (spot: string) => {
    setAdSpot((prev) =>
      prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]
    );
  };

  return (
    <div className="feedback-card">
      <h2 className="title">
        <img src={zapImg} alt="zap" className="icon" />
        ClockSynk Quick Exit Feedback
      </h2>

      {/* Step 1 */}
      <div className="feedback-section">
        <h3>
          <span className="step-number">1</span> Why are you leaving?
        </h3>
        <div className="options">
          <label className="radio-container">
            <input
              type="radio"
              name="reason"
              value="game-over"
              checked={leavingReason === "game-over"}
              onChange={(e) => setLeavingReason(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={gamepadImg} alt="gamepad" className="icon-small" /> Game’s
            over
          </label>

          <label className="radio-container">
            <input
              type="radio"
              name="reason"
              value="checking-score"
              checked={leavingReason === "checking-score"}
              onChange={(e) => setLeavingReason(e.target.value)}
            />
             <span className="checkmark"></span>
            <img src={eyeImg} alt="eye" className="icon-small" /> Just checking
            the score
          </label>

          <label className="radio-container">
            <input
              type="radio"
              name="reason"
              value="too-slow"
              checked={leavingReason === "too-slow"}
              onChange={(e) => setLeavingReason(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={turtleImg} alt="turtle" className="icon-small" /> It wasn’t
            updating fast enough
          </label>

          <label className="other-label radio-container">
            <input
              type="radio"
              name="reason"
              value="other"
              checked={leavingReason === "other"}
              onChange={(e) => setLeavingReason(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={messageImg} alt="message" className="icon-small" /> Other
          </label>

          {leavingReason === "other" && (
            <textarea
              className="other-textarea"
              placeholder="Tell us a bit more..."
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Step 2 */}
      <div className="feedback-section">
        <h3>
          <span className="step-number">2</span> How was it overall?
        </h3>
        <div className="stars">
          {stars.map((s) => {
            const filled = s <= (hoverRating || rating);
            return (
              <img
                key={s}
                src={filled ? starImg : starEmptyImg}
                alt={filled ? "star" : "star-empty"}
                className="star"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
              />
            );
          })}
        </div>
      </div>

      {/* Step 3 */}
      <div className="feedback-section">
        <h3>
          <span className="step-number">3</span> Did you notice any ads?
        </h3>
        <div className="options">
          <label className="radio-container">
            <input
              type="radio"
              name="ads"
              value="yep"
              checked={noticedAds === "yep"}
              onChange={(e) => setNoticedAds(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={thumbsUpImg} alt="thumbs-up" className="icon-small" /> Yep
          </label>
          <label className="radio-container">
            <input
              type="radio"
              name="ads"
              value="nope"
              checked={noticedAds === "nope"}
              onChange={(e) => setNoticedAds(e.target.value)}
            />
            <span className="checkmark"></span>
            <img
              src={thumbsDownImg}
              alt="thumbs-down"
              className="icon-small"
            />{" "}
            Nope
          </label>
          <label className="radio-container">
            <input
              type="radio"
              name="ads"
              value="shrug"
              checked={noticedAds === "shrug"}
              onChange={(e) => setNoticedAds(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={shrugImg} alt="shrug" className="icon-small" /> Didn’t
            notice
          </label>
        </div>

        {noticedAds === "yep" && (
          <div className="nested mt-3">
            <h3 className="mb-1">Which one stood out?</h3>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={adSpot.includes("top")}
                onChange={() => toggleAdSpot("top")}
              />
              <span className="checkmark"></span>
              Top banner
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={adSpot.includes("bottom")}
                onChange={() => toggleAdSpot("bottom")}
              />
              <span className="checkmark"></span>
              Bottom banner
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={adSpot.includes("stats")}
                onChange={() => toggleAdSpot("stats")}
              />
              <span className="checkmark"></span>
              Stats screen
            </label>
          </div>
        )}
      </div>

      {/* Step 4 */}
      <div className="feedback-section">
        <h3>
          <span className="step-number">4</span> Want to get involved?
        </h3>
        <div className="options">
          <label className="radio-container">
            <input
              type="radio"
              name="involve"
              value="sponsor"
              checked={involvement === "sponsor"}
              onChange={(e) => setInvolvement(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={medalImg} alt="medal" className="icon-small" /> Sponsor a
            game
          </label>
          <label className="radio-container">
            <input
              type="radio"
              name="involve"
              value="help"
              checked={involvement === "help"}
              onChange={(e) => setInvolvement(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={megaphoneImg} alt="megaphone" className="icon-small" />{" "}
            Help keep score
          </label>
          <label className="radio-container">
            <input
              type="radio"
              name="involve"
              value="watch"
              checked={involvement === "watch"}
              onChange={(e) => setInvolvement(e.target.value)}
            />
            <span className="checkmark"></span>
            <img src={xImg} alt="x" className="icon-small" /> Just watching
          </label>
        </div>
      </div>

      <button className="btn btn-primary full-width">Submit Feedback</button>
    </div>
  );
}
