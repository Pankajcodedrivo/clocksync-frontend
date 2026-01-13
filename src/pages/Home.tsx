import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ActivePenalties from "../components/ActivePenalties";
import GameStatistics from "../components/GameStatistics";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreBoardComponent from "../components/ScoreBoardComponent";
import { getField, getVerifiedCaptcha } from "../service/api.service";
import useSocket from "../utils/sockect";
import Ads from "../components/Ads";
import loader from "../assets/images/loader.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ReCAPTCHA from "react-google-recaptcha";
import twoMinutesSound from "../assets/audio/twoMinutes.mp3";
import timeUpSound from "../assets/audio/timeUp.mp3";
import penaltySound from "../assets/audio/penalty.mp3";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaTelegram,
  FaReddit,
  FaInstagram,
} from "react-icons/fa";
import "swiper/css";
import { showErrorToast } from "../utils/toast/toast";

interface Settings {
  desktop?: any;
  mobile?: any;
}

interface HomeProps {
  settings?: Settings | null;
}

export default function Home({ settings }: HomeProps) {
  const { fieldslug } = useParams();
  const [game, setGame] = useState<any>(null);
  const [field, setField] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState("");
  const [endGame, setEndGame] = useState(false);
  const [verified, setVerified] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState(false);
  const [playedTwoMin, setPlayedTwoMin] = useState(false);
  const [playedEnd, setPlayedEnd] = useState(false);
  const lastTimeRef = useRef<{ minute: number; second: number } | null>(null);
  const audioTwoMin = useRef<HTMLAudioElement | null>(null);
  const audioEnd = useRef<HTMLAudioElement | null>(null);
  const penaltyMusic = useRef<HTMLAudioElement | null>(null);
  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };


  // Create audio objects AFTER unlock gesture (captcha)
  useEffect(() => {
    if (!audioTwoMin.current) audioTwoMin.current = new Audio(twoMinutesSound);
    if (!audioEnd.current) audioEnd.current = new Audio(timeUpSound);
    if (!penaltyMusic.current) penaltyMusic.current = new Audio(penaltySound);
  }, []);


  const unlockSafariAudio = () => {
    const audios = [audioTwoMin.current, audioEnd.current, penaltyMusic.current].filter(
    Boolean
    ) as HTMLAudioElement[];


    audios.forEach((a) => {
      a.muted = true;
      a.play()
      .then(() => {
      a.pause();
      a.currentTime = 0;
      a.muted = false;
      })
      .catch(() => {});
    });
  };

  const handleCaptcha = async (value: string | null) => {
    if (!value) return;
    try {
      const data = await getVerifiedCaptcha(value);
      if (data.success && data.human) {
        setVerified(true);
        unlockSafariAudio();
        sessionStorage.setItem("captchaVerified", "true");
      } else {
        showErrorToast("Bot detected ❌");
        setVerified(false);
      }
    } catch {
      showErrorToast("CAPTCHA verification failed.");
    }
  };

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
        } catch (err: any) {
          if (err?.response?.data?.message) {
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

  // 📤 Social share
  const handleSharePlatform = async (platform: string) => {
    try {
      const BASE_URL = window.location.origin;
      const shareUrl = `${BASE_URL}/game/${game?._id}`;
      const encodedUrl = encodeURIComponent(shareUrl);
      const encodedMessage = encodeURIComponent("Check out this live game scoreboard!");

      switch (platform) {
        case "facebook":
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank");
          break;
        case "twitter":
          window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`, "_blank");
          break;
        case "whatsapp":
          window.open(`https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`, "_blank");
          break;
        case "linkedin":
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank");
          break;
        case "telegram":
          window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`, "_blank");
          break;
        case "reddit":
          window.open(`https://reddit.com/submit?url=${encodedUrl}&title=${encodedMessage}`, "_blank");
          break;

        case "instagram":
        if (!isMobileDevice()) {
          showErrorToast("Instagram sharing is available on mobile only.");
          return;
        }

        if (navigator.share) {
          await navigator.share({
            title: "Live Game Scoreboard",
            text: "Check out this live game scoreboard!",
            url: shareUrl,
          });
        } else {
          showErrorToast("Instagram sharing not supported on this device.");
        }
        break;
      }
    } catch (err) {
      console.error("Share failed:", err);
      showErrorToast("Could not share this page.");
    } finally {
      setShowPopup(false);
    }
  };

  useSocket(game?._id, {
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));

      const minutes = Number(clock?.minutes);
      const seconds = Number(clock?.seconds);

      // Previous clock stored safely
      if (!lastTimeRef.current) {
        lastTimeRef.current = { minute: minutes, second: seconds };
      }
      const last = lastTimeRef.current;

      // Save current time for next comparison
      lastTimeRef.current = { minute: minutes, second: seconds };

      // 1️⃣ Detect quarter change (because clockUpdated includes quarter updates)
      if (clock?.quarter !== gameStatistics?.clock?.quarter) {
        setPlayedTwoMin(false);
        setPlayedEnd(false);
      }
      // 2️⃣ Two-minute warning → plays if:
      // - never played in this quarter
      // - transitions from ABOVE 2:00 into <= 2:00
      if (!playedTwoMin) {
        const nowAtTwoOrLess = minutes < 2 || (minutes === 2 && seconds === 0);
        const wasAboveTwo = last.minute > 2 || (last.minute === 2 && last.second > 0);
        if (nowAtTwoOrLess && wasAboveTwo) {
          audioTwoMin.current?.play().catch(err => console.error(err));
          setPlayedTwoMin(true);
        }
      }

      // 3️⃣ End-of-quarter 0:00 → only when transitioning into 0:00
      if (!playedEnd) {
        const nowZero = minutes === 0 && seconds === 0;
        const wasNotZero = last.minute !== 0 || last.second !== 0;

        if (nowZero && wasNotZero) {
          audioEnd.current?.play().catch(err => console.error(err));
          setPlayedEnd(true);
        }
      }
    },
    gameEnded: () => {
      setEndGame(true);
      audioEnd.current?.play().catch(err => console.error(err));
      setPlayedEnd(true);

    },
    scoreUpdated: (stats: any) => setGameStatistics(stats),
    statUpdated: (stats: any) => setGameStatistics(stats),
     // actionAdded event contains the raw action payload (emitted by server)
    actionAdded: (event: any) => {
      try {
        // Only play for penalty actions
        if (event?.type === "penalty") {
          penaltyMusic.current?.play().catch(err => {
             console.warn("Penalty audio blocked:", err);
          });
        }
      } catch (err) {
        console.error("Error handling actionAdded:", err);
      }
    }
  });
  const adsTime =
  field && field.adsTime && !isNaN(field.adsTime) && Number(field.adsTime) > 0
    ? Number(field.adsTime) * 1000
    : 30000;
  // ✅ Get ads safely (handles array or single ad, with fallback)
  const getAds = (
    placement: "top" | "right" | "left" | "middle" | "bottom",
    device: "desktop" | "mobile"
  ) => {
    const fieldAds = field?.ads?.[device]?.[placement];
    const settingAds = settings?.[device]?.[placement];

    const normalize = (ads: any) => {
      if (!ads) return [];
      return Array.isArray(ads) ? ads : [ads];
    };

    const ads = normalize(fieldAds);
    if (ads.length > 0) return ads;
    return normalize(settingAds);
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
        <div className="action-buttons">
        <button
          onClick={() => {
            if (field?.slug) {
              window.location.href = `/${field.slug}`; // Hard reload
            }
          }}
          className="btn btn-secondary"
        >
          Load Next Game
        </button>
      </div>
        <section className="score-board-sec">
          <div className="container small-container">
            <div className="score-top pd cmn-box p-30">
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
            <div className="score-top pd cmn-box p-30">
              <h1>{message || "Field not found."}</h1>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="wrapper no-data">
        <section className="score-board-sec">
          <div className="container small-container">
            <div className="score-top pd cmn-box p-30">
              <h2>Please verify you are human to continue</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReCAPTCHA
                  sitekey="6Le-NC0sAAAAAPeyL_hmUHAbQ43wMae28j6dp7kJ"
                  onChange={handleCaptcha}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* Share Button */}
      <div className="action-buttons">
        <button
          onClick={() => {
            if (field?.slug) {
              window.location.href = `/${field.slug}`; // Hard reload
            }
          }}
          className="btn btn-secondary"
        >
          Load Next Game
        </button>

        <button
          onClick={() => setShowPopup(true)}
          className="btn btn-primary"
        >
          Share
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px 30px",
              borderRadius: "12px",
              minWidth: "280px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Share this scoreboard</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px 0",
                fontSize: "40px",
                gap: "10px",
              }}
            >
              <FaFacebook color="#1877f2" onClick={() => handleSharePlatform("facebook")} cursor="pointer" />
              <FaTwitter color="#1da1f2" onClick={() => handleSharePlatform("twitter")} cursor="pointer" />
              <FaWhatsapp color="#25D366" onClick={() => handleSharePlatform("whatsapp")} cursor="pointer" />
              <FaLinkedin color="#0077b5" onClick={() => handleSharePlatform("linkedin")} cursor="pointer" />
              <FaTelegram color="#0088cc" onClick={() => handleSharePlatform("telegram")} cursor="pointer" />
              <FaReddit color="#ff4500" onClick={() => handleSharePlatform("reddit")} cursor="pointer" />
              {isMobileDevice() && (
                <FaInstagram
                  color="#E4405F"
                  onClick={() => handleSharePlatform("instagram")}
                  cursor="pointer"
                />
              )}
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="btn btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="add-sec">
        <div className="container small-container">
          <div className="add-otr d-block d-xl-none">
            
            <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
              {getAds("top", "mobile").map((ad: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl || ad.image} link={ad.link} />
                </SwiperSlide>
              ))}
            </Swiper> 
          </div>
          <div className="add-otr d-none d-xl-block">
            <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
              {getAds("top", "desktop").map((ad: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl || ad.image} link={ad.link} />
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

          {/* Mobile middle ads */}
          <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
            <div className="add-otr">
              <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
                {getAds("middle", "mobile").map((ad: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Ads image={ad.imageUrl || ad.image} link={ad.link} />
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

          {/* Mobile bottom ads */}
          <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
            <div className="add-otr">
              <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
                {getAds("bottom", "mobile").map((ad: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <Ads image={ad.imageUrl || ad.image} link={ad.link} />
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

        {/* Desktop left ads */}
        <div className="left d-none d-xl-block">
          <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
            {getAds("left", "desktop").map((ad: any, idx: number) => (
              <SwiperSlide key={idx}>
                <Ads image={ad.imageUrl || ad.image} link={ad.link} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop right ads */}
        <div className="right d-none d-xl-block">
          <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
            {getAds("right", "desktop").map((ad: any, idx: number) => (
              <SwiperSlide key={idx}>
                <Ads image={ad.imageUrl || ad.image} link={ad.link} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
