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
import ActionComponent from "../components/ActionComponent";
import RecentActivities from "../components/RecentActivities";

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
  const [goalSecond, setGoalSecond] = useState("");
  const [penaltyTeam, setPenaltyTeam] = useState("home");
  const [penaltyPlayer, setPenaltyPlayer] = useState("");
  const [penaltyMinutes, setPenaltyMinutes] = useState("");
  const [penaltySeconds, setPenaltySeconds] = useState("");
  const [penaltyType, setPenaltyType] = useState("releasable");
  const [loading, setLoading] = useState(false);
  const [endGame,setEndGame] =useState(false);
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
        if(gameData?.game?.endGame){
          setEndGame(true);
        } 
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
    gameEnded: (_) => {
      console.log(1);
      setEndGame(true)
    },
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));
    },
    gameReset: (stats: any) => {
      setGameStatistics(stats);
    },
    penaltyRemoved: (stats: any) => {
      setGameStatistics(stats);
    },
    penaltyAdded: (stats: any) => {
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
      second:parseInt(goalSecond)
    };

    emit("addGoal", payload);
    setGameStatistics((prev: any) => ({
      ...prev,
      goals: [...(prev?.goals || []), payload],
    }));
    setGoalPlayer("");
    setGoalSecond("");
    setGoalMinute("");
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
    setPenaltyPlayer("");
    setPenaltyMinutes("");
    setPenaltySeconds("");
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
  if (endGame) {
    return (
      <div className="wrapper no-data">
        <section className="score-board-sec">
          <div className="container small-container">
            <div className="score-top pd cmn-box pt-30">
              <h1>Game is ended.</h1>
            </div>
          </div>
        </section>
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
        <div className="container">
          <div className="score-top pd cmn-box pt-30">
            <div className="text-center hdr">
              <h1>Score Keeper</h1>
            </div>
            <ScoreKeeperComponent gameStatistics={gameStatistics} game={game} />
          </div>
          <div className="actions-outer-wrap">
              <div className="action-inner">
                <ActionComponent gameStatistics={gameStatistics} game={game} teamName="home"/>
                <ActionComponent gameStatistics={gameStatistics} game={game} teamName="away"/>
              </div>
          </div>
          <div className="eventlist-outer-wrap">
            <RecentActivities  gameStatistics={gameStatistics} game={game} />
          </div>

          </div>
        </section>
    </div>
  );
}
