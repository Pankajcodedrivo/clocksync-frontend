import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ScoreKeeperComponent from "../components/ScoreKeeperComponent";
import playbtn from "../assets/images/play-icon.svg";
import pausebtn from "../assets/images/pause-icon.svg";
import loader from "../assets/images/loader.svg";
import { getGame, verifyScoreKeeperCode } from "../service/api.service";
import useSocket from "../utils/sockect";
import ActionComponent from "../components/ActionComponent";
import RecentActivities from "../components/RecentActivities";
import QuarterPopup from "../components/QuarterPopup";
import { showConfirmAlert } from "../utils/toast/toast";

export default function ScoreKeeper() {
  const [searchParams] = useSearchParams();
  const [game, setGame] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  const [showQuarterPopup, setShowQuarterPopup] = useState(false);
  // Form state
  const [loading, setLoading] = useState(false);
  const [endGame, setEndGame] = useState(false);
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
        if (gameData?.game?.endGame) {
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
      setEndGame(true)
    },
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));
    },
    statUpdated: (stats: any) => {
      setGameStatistics(stats);
    },
  });
    // Clock controls
  const handleToggleTimer = () => {
    if (gameStatistics.clock.running) {
      emit("pauseClock", { gameId });
    } else {
      emit("startClock", { gameId });
    }
  }
  const formatTime = (m: number, s: number) =>
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;


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
            <div className="score-top">
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
                    <div className="score-top pd cmn-box p-30">
                      <h1>No game data found.</h1>
                    </div>
                </div>
              </section>
          </div>
        );
  } 

    const handleEnd = async() => {
      const confirmEnd = await showConfirmAlert("Are you sure you want to end the game? This cannot be undone.");
    
      if (!confirmEnd.isConfirmed) return;

      // 🔹 Emit socket event to end the game
      emit("gameEnded", { gameId });
    };
  return (
    <div className="wrapper">
      <section className="score-board-sec">
        <div className="container">
          <div className="score-top">
            <div className="text-center hdr">
              <div className="clock-wrap" >
                  {(game?.fieldId?.unviseralClock)?
                    null:
                    <img onClick={handleToggleTimer} style={{cursor:"pointer"}} src={gameStatistics?.clock?.running ? pausebtn : playbtn} alt={gameStatistics?.clock?.running ? "pause" : "play"} />
                  }
                  <div className="timer">
                    <span>{formatTime(gameStatistics.clock.minutes, gameStatistics.clock.seconds)}</span>
                     <p>Q{gameStatistics.clock.quarter}</p>
                  </div>
              </div>
            </div>
            <ScoreKeeperComponent gameStatistics={gameStatistics} game={game} socketEmit={emit} />
          </div>
          <div className="actions-outer-wrap">
              <div className="action-inner row g-5">
                <div className="col-md-6">
                  <ActionComponent game={game} running={gameStatistics?.clock?.running} teamName="home" socketEmit={emit} />
                </div>
                <div className="col-md-6">
                  <ActionComponent game={game} running={gameStatistics?.clock?.running} teamName="away" socketEmit={emit} />
                </div>
              </div>
          </div>
          <div className="eventlist-outer-wrap">
            <RecentActivities gameStatistics={gameStatistics} game={game} socketEmit={emit} />
          </div>
          <div className="score-board-footer">
            <div className="container">
              <div className="score-board-footer">
                {(game?.fieldId?.unviseralClock)? null :
                  <button className="btn blue-btn" onClick={() => setShowQuarterPopup(true)}>Set Quarter</button>
                }
                <button className="btn red-btn" onClick={handleEnd}>End Game</button>
              </div>
            </div>
          </div>
          </div>
        </section>
        {showQuarterPopup && (
          <QuarterPopup onclosePopup={() => setShowQuarterPopup(false)} socketEmit={emit} gameId={gameId} />
        )}
    </div>
  );
}
