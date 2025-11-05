import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActivePenalties from "../components/ActivePenalties";
import GameStatistics from "../components/GameStatistics";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreBoardComponent from "../components/ScoreBoardComponent";
import { getGameScoreByID, getVerifiedCaptcha } from "../service/api.service";
import Ads from "../components/Ads";
import loader from "../assets/images/loader.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaTelegram,
  FaReddit,
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

export default function Game({ settings }: HomeProps) {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const [field, setField] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isVerified = sessionStorage.getItem("captchaVerified");
    if (isVerified === "true") {
      setVerified(true);
    }
  }, []);

  const handleCaptcha = async (value: string | null) => {
    if (!value) return;
    try {
      const data = await getVerifiedCaptcha(value);
      if (data.success && data.human) {
        setVerified(true);
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
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getGameScoreByID(id);
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
  }, [id]);

  const adsTime =
  field && field.adsTime && !isNaN(field.adsTime) && Number(field.adsTime) > 0
    ? Number(field.adsTime) * 1000
    : 30000;
  // ✅ Helper: normalize ads (works with array or single object)
  const normalizeAds = (ads: any) => {
    if (!ads) return [];
    return Array.isArray(ads) ? ads : [ads];
  };

  // ✅ Helper: get ads with fallback to settings
  const getAds = (
    placement: "top" | "right" | "left" | "middle" | "bottom",
    device: "desktop" | "mobile"
  ) => {
    const fieldAds = normalizeAds(field?.ads?.[device]?.[placement]);
   
    if (fieldAds.length > 0) return fieldAds;

    const settingAds = normalizeAds(settings?.[device]?.[placement]);
    return settingAds;
  };

  // 📤 Share handler
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
          window.open(
            `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
            "_blank"
          );
          break;
        case "whatsapp":
          window.open(
            `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`,
            "_blank"
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            "_blank"
          );
          break;
        case "telegram":
          window.open(
            `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
            "_blank"
          );
          break;
        case "reddit":
          window.open(
            `https://reddit.com/submit?url=${encodedUrl}&title=${encodedMessage}`,
            "_blank"
          );
          break;
      }
    } catch (err) {
      console.error("Share failed:", err);
      showErrorToast("Could not share this page.");
    } finally {
      setShowPopup(false);
    }
  };

  // ✅ Loader state
  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="wrapper no-data">
        <section className="score-board-sec">
          <div className="container small-container">
            <div className="score-top pd cmn-box pt-30">
              <h1>{message ? message : "Field not found."}</h1>
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
            <div className="score-top pd cmn-box pt-30">
              <h2>Please verify you are human to continue</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReCAPTCHA
                  sitekey="6LefqwAsAAAAALvrolPDrDZxYV4nJiy0mBWWyd8H"
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
      {/* Sticky action buttons */}
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
            </div>

            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: "15px",
                backgroundColor: "#3B82F6",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Ads + Content */}
      <div className="add-sec">
        <div className="container small-container">
          {/* Mobile Top */}
          <div className="add-otr d-block d-xl-none">
            <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
              {getAds("top", "mobile").map((ad: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl || ad.image} link={ad.link} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Top */}
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

          {/* Mobile Middle */}
          <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
            <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
              {getAds("middle", "mobile").map((ad: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl || ad.image} link={ad.link} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="cmn-box">
            <h2>Active Penalties</h2>
            <ActivePenalties gameStatistics={gameStatistics} game={game} />
          </div>

          <div className="cmn-box">
            <h2>Game Statistics</h2>
            <GameStatistics gameStatistics={gameStatistics} game={game} />
          </div>

          {/* Mobile Bottom */}
          <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
            <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
              {getAds("bottom", "mobile").map((ad: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <Ads image={ad.imageUrl || ad.image} link={ad.link} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="cmn-box mb-0">
            <h2>Live Stats Tracker</h2>
            <LiveStatsTracker gameStatistics={gameStatistics} game={game} />
          </div>
        </div>

        {/* Desktop Left */}
        <div className="left d-none d-xl-block">
          <Swiper modules={[Autoplay]} autoplay={{ delay: adsTime, disableOnInteraction: false }} loop slidesPerView={1}>
            {getAds("left", "desktop").map((ad: any, idx: number) => (
              <SwiperSlide key={idx}>
                <Ads image={ad.imageUrl || ad.image} link={ad.link} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Right */}
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
