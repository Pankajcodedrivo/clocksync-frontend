import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActivePenalties from "../components/ActivePenalties";
import GameStatistics from "../components/GameStatistics";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreBoardComponent from "../components/ScoreBoardComponent";
import { getField } from "../service/api.service";
import useSocket from "../utils/sockect";
import Ads from "../components/Ads";
import loader from "../assets/images/loader.svg";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"   // 👈 Required for autoplay

// Import Swiper styles
import "swiper/css"
export default function Home() {
  const { fieldslug } = useParams();
  const [game, setGame] = useState<any>(null);
  const [field, setField] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState("");
  const [endGame,setEndGame] =useState(false);

  useEffect(() => {
    if (fieldslug) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getField(fieldslug);
          if (!res || res.status === 404) {
            setNotFound(true);
          } else {
            setField(res?.field);
            setGame(res?.games);
            setGameStatistics(res?.gameStatistics);
          }
        } catch (err:any) {
          if(err?.response?.data?.message){
            setMessage(err?.response?.data?.message);
          }
          console.error("Error fetching field:", err);
          setNotFound(true);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [fieldslug]);

  useSocket(game?._id, {
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));
    },
    setQuater: (stats: any) => {
      setGameStatistics((prev: any) => ({
        ...prev,
        clock: {
          ...prev.clock,
          quarter: stats.clock.quarter,
        },
      }));
    },
    gameEnded: (_) => {
      console.log(1);
      setEndGame(true)
    },
    scoreUpdated: (stats: any) => setGameStatistics(stats),
    penaltyRemoved: (stats: any) => setGameStatistics(stats),
    statUpdated: (stats: any) => setGameStatistics(stats),
    goalAdded: (stats: any) => setGameStatistics(stats),
    penaltyAdded: (stats: any) => setGameStatistics(stats),
    gameReset: (stats: any) => setGameStatistics(stats),
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
  if (notFound) {
    return (
      <div className="wrapper no-data">
        <section className="score-board-sec">
          <div className="container small-container">
            <div className="score-top pd cmn-box pt-30">
              <h1>{message?message:"Field not found."}</h1>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="add-sec">
        <div className="container small-container">
          <div className="add-otr d-block d-xl-none">
            <Swiper  modules={[Autoplay]}                  // 👈 Register module here
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}                           // 👈 Enable looping
              slidesPerView={1}>
              {field?.ads?.mobile?.top?.map((ad:any, idx:number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl} link={ad.link} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="add-otr d-none d-xl-block">
            <Swiper  modules={[Autoplay]}                  // 👈 Register module here
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}                           // 👈 Enable looping
              slidesPerView={1}>
              {field?.ads?.desktop?.top?.map((ad:any, idx:number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl} link={ad.link} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <section className="score-board-sec">
        <div className="container small-container">
          <div className="score-top">
            <div className="text-center hdr">
              <h1>Score Board</h1>
            </div>
            <ScoreBoardComponent gameStatistics={gameStatistics} game={game} />
          </div>
          <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
            <div className="add-otr">
              <Swiper  modules={[Autoplay]}                  // 👈 Register module here
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}                           // 👈 Enable looping
                slidesPerView={1}>
                {field?.ads?.mobile?.middle?.map((ad:any, idx:number) => (
                  <SwiperSlide key={idx}>
                    <Ads image={ad.imageUrl} link={ad.link} />
                  </SwiperSlide>
                ))}
            </Swiper>
             
            </div>
          </div>
          <div className="cmn-box">
            <h2>Active Penalties</h2>
            <ActivePenalties gameStatistics={gameStatistics} game={game} />
          </div>
          <div className="cmn-box">
            <h2>Game Statistics</h2>
            <GameStatistics gameStatistics={gameStatistics} game={game} />
          </div>
          <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
            <div className="add-otr">
              <Swiper  modules={[Autoplay]}                  // 👈 Register module here
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}                           // 👈 Enable looping
                slidesPerView={1}>
                  {field?.ads?.mobile?.bottom?.map((ad:any, idx:number) => (
                    <SwiperSlide key={idx}>
                      <Ads image={ad.imageUrl} link={ad.link} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className="cmn-box mb-0">
            <h2>Live Stats Tracker</h2>
            <LiveStatsTracker gameStatistics={gameStatistics} game={game} />
          </div>
        </div>
        <div className="left d-none d-xl-block">
            <Swiper  modules={[Autoplay]}                  // 👈 Register module here
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}                           // 👈 Enable looping
              slidesPerView={1}>
                {field?.ads?.desktop?.left?.map((ad:any, idx:number) => (
                  <SwiperSlide key={idx}>
                    <Ads image={ad.imageUrl} link={ad.link} />
                  </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <div className="right d-none d-xl-block">
            <Swiper  modules={[Autoplay]}                  // 👈 Register module here
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}                           // 👈 Enable looping
              slidesPerView={1}>
                {field?.ads?.desktop?.right?.map((ad:any, idx:number) => (
                  <SwiperSlide key={idx}>
                    <Ads image={ad.imageUrl} link={ad.link} />
                  </SwiperSlide>
                ))}
            </Swiper>
        </div>
      </section>
    </div>
  );
}
