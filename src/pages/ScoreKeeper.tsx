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

export default function ScoreKeeper() {
  const [searchParams] = useSearchParams();
  const [game, setGame] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  // Form state
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
      setEndGame(true)
    },
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));
    },
    statUpdated: (stats: any) => {
      setGameStatistics(stats);
    },
  });

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
              <div className="clock-wrap">
                  <img src={playbtn} />
                  <div className="timer">
                    <span>12:00</span>
                  </div>
              </div>
            </div>
            <ScoreKeeperComponent gameStatistics={gameStatistics} game={game} />
          </div>
          <div className="actions-outer-wrap">
              <div className="action-inner">
                <ActionComponent  game={game} teamName="home" socketEmit={emit}/>
                <ActionComponent  game={game} teamName="away" socketEmit={emit}/>
              </div>
          </div>
          <div className="eventlist-outer-wrap">
            <RecentActivities  gameStatistics={gameStatistics} game={game} />
          </div>
          <div className="score-board-footer">
              <button>Set Quarter</button>
              <button>End Game</button>
          </div>
          </div>
        </section>
    </div>
  );
}
