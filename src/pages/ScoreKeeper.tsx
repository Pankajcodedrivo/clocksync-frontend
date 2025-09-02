import ActivePenalties from "../components/ActivePenalties";
import GameStatisticsScoreKeeper from "../components/GameStatisticsScoreKeeper";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreKeeperComponent from "../components/ScoreKeeperComponent";
import AccArrow from "../assets/images/down-arrow-blue.svg";

import { getGame, verifyScoreKeeperCode } from "../service/api.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ScoreKeeper() {
    const [searchParams] = useSearchParams();
    const [game, setGame] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // 🔹 URL param
    const urlCode = searchParams.get("code");
        console.log(urlCode);
    // 🔹 Stored values
    const accessToken = localStorage.getItem("access_token") ?? "";
    const gameId = localStorage.getItem("game_id") ?? "";

    // 1️⃣ If URL has code → verify & save tokens + gameId
    useEffect(() => {
        const handleVerify = async () => {
            if (urlCode && !accessToken) {
                try {
                    const res = await verifyScoreKeeperCode(urlCode);
                    localStorage.setItem("access_token", res?.tokens?.access);
                    localStorage.setItem("refresh_token", res?.tokens?.refresh);
                    localStorage.setItem("game_id", res?.gameId);
                } catch (err) {
                    console.error("Failed to verify scorekeeper code:", err);
                }
            }
        };
        handleVerify();
    }, [urlCode]);

    // 2️⃣ Fetch game with access token + saved gameId
    useEffect(() => {
        const fetchGame = async () => {
        if (!accessToken || !gameId) return;
        try {
            setLoading(true);
            const gameData = await getGame(gameId, accessToken);
            setGame(gameData);
        } catch (err) {
            console.error("Error fetching game:", err);
        } finally {
            setLoading(false);
        }
        };
        fetchGame();
    }, [accessToken, gameId]);

    if (loading) {
        return <p className="text-center">Loading game data...</p>;
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
                <ScoreKeeperComponent />
            </div>

            {/* Add Goal */}
            <div className="cmn-box">
                <h2>Add Goal</h2>
                <div className="information-form-wrapper text-center">
                <div className="information-form add-scorer">
                    <select className="form-control ngo-select">
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                    </select>
                    <input type="text" placeholder="Player No" className="form-control name" />
                    <select className="form-control mins-select">
                    <option value="">Mins.</option>
                    {Array.from({ length: 90 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                        {i + 1}
                        </option>
                    ))}
                    </select>
                    <button type="submit" className="btn btn-primary">Add Goal</button>
                </div>
                </div>
            </div>

            {/* Add Penalties */}
            <div className="cmn-box">
                <h2>Add Penalties</h2>
                <div className="information-form-wrapper text-center">
                <div className="information-form add-scorer">
                    <select className="form-control ngo-select">
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                    </select>
                    <input type="text" placeholder="Player No" className="form-control name" />
                    <div className="time-select">
                    <select className="form-control mins-select">
                        <option value="">Mins.</option>
                        {Array.from({ length: 90 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                        ))}
                    </select>
                    <select className="form-control mins-select">
                        <option value="">Sec.</option>
                        {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                        ))}
                    </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Penalties</button>
                </div>
                </div>
            </div>

            {/* Active Penalties */}
            <div className="cmn-box">
                <h2>Active Penalties</h2>
                <ActivePenalties />
            </div>

            {/* Game Statistics */}
            <div className="cmn-box">
                <h2>Game Statistics</h2>
                <button type="button" data-bs-toggle="collapse" data-bs-target="#game-statistics" className="acc-arrow">
                <img src={AccArrow} alt="" />
                </button>
                <div className="collapse" id="game-statistics">
                <GameStatisticsScoreKeeper />
                </div>
            </div>

            {/* Live Stats Tracker */}
            <div className="cmn-box mb-0">
                <h2>Live Stats Tracker</h2>
                <button type="button" data-bs-toggle="collapse" data-bs-target="#live-stats-tracker" className="acc-arrow">
                <img src={AccArrow} alt="" />
                </button>
                <div className="collapse" id="live-stats-tracker">
                <LiveStatsTracker />
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}
