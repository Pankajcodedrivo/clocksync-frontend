import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActivePenalties from "../components/ActivePenalties";
import GameStatisticsScoreKeeper from "../components/GameStatisticsScoreKeeper";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreKeeperComponent from "../components/ScoreKeeperComponent";
import AccArrow from "../assets/images/down-arrow-blue.svg";
import loader from "../assets/images/loader.svg";
import { getGame, verifyScoreKeeperCode } from "../service/api.service";
import useSocket from "../utils/sockect";

export default function ScoreKeeper() {
  const [searchParams] = useSearchParams();
  const [game, setGame] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  const [submittingGoal, setSubmittingGoal] = useState(false);
  const [submittingPenalty, setSubmittingPenalty] = useState(false);
  // Form state
  const [goalTeam, setGoalTeam] = useState("home");
  const [goalPlayer, setGoalPlayer] = useState("");
  const [goalMinute, setGoalMinute] = useState("");

  const [penaltyTeam, setPenaltyTeam] = useState("home");
  const [penaltyPlayer, setPenaltyPlayer] = useState("");
  const [penaltyMinutes, setPenaltyMinutes] = useState("");
  const [penaltySeconds, setPenaltySeconds] = useState("");
  const [penaltyType, setPenaltyType] = useState("legal");
  const [loading, setLoading] = useState(false);
  // URL param
  const urlCode = searchParams.get("code");
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("access_token") ?? "");
  const [gameId, setGameId] = useState(sessionStorage.getItem("game_id") ?? "");

  // Verify scorekeeper code
  useEffect(() => {
    const handleVerify = async () => {
      if (urlCode && !accessToken) {
        try {
          setLoading(true);
          const res = await verifyScoreKeeperCode(urlCode);
          sessionStorage.setItem("access_token", res?.tokens?.access);
          sessionStorage.setItem("refresh_token", res?.tokens?.refresh);
          sessionStorage.setItem("game_id", res?.gameId);
          setAccessToken(res?.tokens?.access);
          setGameId(res?.gameId);
        } catch (err) {
          setLoading(false);
          console.error("Failed to verify scorekeeper code:", err);
        }
      }
    };
    handleVerify();
  }, [urlCode]);

  // Fetch game & initialize statistics
  useEffect(() => {
    const fetchGame = async () => {
      if (!accessToken || !gameId) return;
      try {
        setLoading(true);
        const gameData = await getGame(gameId, accessToken);
        setGame(gameData?.game);
        setLoading(false);
        if (gameData?.gameStatistics) setGameStatistics(gameData.gameStatistics);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching game:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [accessToken, gameId]);

  // Setup socket
  const { emit } = useSocket(gameId, {
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));
    },
    gameReset: (stats: any) => {
      setGameStatistics(stats);
    },
  });

  // Dynamic Add Goal
  const handleAddGoal = () => {
    if (submittingGoal) return; // ⛔ prevent double-clicks
    if (!goalPlayer || !goalMinute) return alert("Please select player and minute");

    setSubmittingGoal(true); // 🔒 lock button

    const payload = {
      gameId,
      team: goalTeam,
      playerNo: parseInt(goalPlayer),
      minute: parseInt(goalMinute),
    };

    emit("addGoal", payload);
    setGameStatistics((prev: any) => ({
      ...prev,
      goals: [...(prev?.goals || []), payload],
    }));

    // ✅ unlock after short delay (or after socket ack if you add it)
    setTimeout(() => setSubmittingGoal(false), 1000);
  };

  // Dynamic Add Penalty
  const handleAddPenalty = () => {
    if (submittingPenalty) return; // ⛔ prevent double-clicks
    if (!penaltyPlayer || !penaltyMinutes || !penaltySeconds)
      return alert("Please fill all penalty fields");

    setSubmittingPenalty(true); // 🔒 lock button

    const payload = {
      gameId,
      team: penaltyTeam,
      type: penaltyType,
      playerNo: parseInt(penaltyPlayer),
      minutes: parseInt(penaltyMinutes),
      seconds: parseInt(penaltySeconds),
    };

    emit("addPenalty", payload);
    setGameStatistics((prev: any) => ({
      ...prev,
      penalties: [...(prev?.penalties || []), payload],
    }));

    setTimeout(() => setSubmittingPenalty(false), 1000);
  };


  if (loading) {
        return (
          <div className="loader-overlay">
            <div className="loader">
              <img src={loader} alt="loader" />
            </div>
          </div>
        
        );
    }
  if (!game) {
        return (
        <div className="wrapper no-data">
            <section className="score-board-sec">
              <div className="container small-container">
                  <div className="score-top pd cmn-box pt-30">
                  <h1>No game data found.</h1>
                  </div>
              </div>
            </section>
        </div>
        );
    }

  return (
    <div className="wrapper">
      <section className="score-board-sec">
        <div className="container small-container">
          <div className="score-top pd cmn-box pt-30">
            <div className="text-center hdr">
              <h1>Score Keeper</h1>
            </div>
            <ScoreKeeperComponent gameStatistics={gameStatistics} setGameStatistics={setGameStatistics} socketEmit={emit} game={game} />
          </div>

          {/* Add Goal */}
          <div className="cmn-box">
            <h2>Add Goal</h2>
            <div className="information-form-wrapper text-center">
              <div className="information-form add-scorer">
                <select value={goalTeam} onChange={(e) => setGoalTeam(e.target.value)} className="form-control ngo-select">
                  <option value="home">{game?.homeTeamName}</option>
                  <option value="away">{game?.awayTeamName}</option>
                </select>
                <input type="number" placeholder="Player No" value={goalPlayer} onChange={(e) => setGoalPlayer(e.target.value)} className="form-control name" />
                <select value={goalMinute} onChange={(e) => setGoalMinute(e.target.value)} className="form-control mins-select">
                  <option value="">Mins.</option>
                  {Array.from({ length: 90 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <button type="submit" onClick={handleAddGoal} disabled={submittingGoal} className="btn btn-primary">Add Goal</button>
              </div>
            </div>
          </div>

          {/* Add Penalties */}
          <div className="cmn-box">
            <h2>Add Penalty</h2>
            <div className="information-form-wrapper text-center">
              <div className="information-form add-scorer">
                <select value={penaltyTeam} onChange={(e) => setPenaltyTeam(e.target.value)} className="form-control ngo-select">
                  <option value="home">{game?.homeTeamName}</option>
                  <option value="away">{game?.awayTeamName}</option>
                </select>
                <input type="number" placeholder="Player No" value={penaltyPlayer} onChange={(e) => setPenaltyPlayer(e.target.value)} className="form-control name" />
                <select value={penaltyType} onChange={(e) => setPenaltyType(e.target.value)} className="form-control ngo-type">
                  <option value="releasable">Releasable</option>
                  <option value="non-releasable">Non-Releasable</option>
                </select>
                <select value={penaltyMinutes} onChange={(e) => setPenaltyMinutes(e.target.value)} className="form-control mins-select">
                  <option value="">Mins.</option>
                  {Array.from({ length: 90 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select value={penaltySeconds} onChange={(e) => setPenaltySeconds(e.target.value)} className="form-control mins-select">
                  <option value="">Sec.</option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                
                <button type="submit" onClick={handleAddPenalty}  disabled={submittingPenalty} className="btn btn-primary">Add Penalty</button>
              </div>
            </div>
          </div>

          {/* Active Penalties */}
          <div className="cmn-box">
            <h2>Active Penalties</h2>
            <ActivePenalties gameStatistics={gameStatistics} game={game} setGameStatistics={setGameStatistics} socketEmit={emit}/>
          </div>

          {/* Game Statistics */}
          <div className="cmn-box">
            <h2>Game Statistics</h2>
            <button type="button" data-bs-toggle="collapse" data-bs-target="#game-statistics" className="acc-arrow">
              <img src={AccArrow} alt="" />
            </button>
            <div className="collapse" id="game-statistics">
              <GameStatisticsScoreKeeper gameStatistics={gameStatistics} setGameStatistics={setGameStatistics} emit={emit} game={game} />
            </div>
          </div>

          {/* Live Stats Tracker */}
          <div className="cmn-box mb-0">
            <h2>Live Stats Tracker</h2>
            <button type="button" data-bs-toggle="collapse" data-bs-target="#live-stats-tracker" className="acc-arrow">
              <img src={AccArrow} alt="" />
            </button>
            <div className="collapse" id="live-stats-tracker">
              <LiveStatsTracker gameStatistics={gameStatistics} game={game} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
