import React, { useEffect } from "react"

interface GoogleAd {
  slot: string
  width: number
  height: number
}

interface AdsProps {
  image?: string
  link?: string
  useGoogleAd?: boolean
  googleAdSense?: GoogleAd
  clientKey: string
}

const Ads: React.FC<AdsProps> = ({ image, link, useGoogleAd, googleAdSense, clientKey }) => {
  useEffect(() => {
    if (useGoogleAd && googleAdSense) {
      if (
        !document.querySelector(
          `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`
        )
      ) {
        const script = document.createElement("script")
        script.async = true
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientKey}`
        script.crossOrigin = "anonymous"
        document.head.appendChild(script)
      }

      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.warn("Adsense error:", err)
      }
    }
  }, [useGoogleAd, googleAdSense, clientKey])

  const googleAdEl =
    useGoogleAd && googleAdSense ? (
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: googleAdSense.width,
          height: googleAdSense.height,
        }}
        data-ad-client={clientKey}
        data-ad-slot={googleAdSense.slot}
      />
    ) : null

  const imageAdEl =
    image && image.trim() !== "" ? (
      link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={image} alt="ad" style={{ maxWidth: "100%" }} />
        </a>
      ) : (
        <img src={image} alt="ad" style={{ maxWidth: "100%" }} />
      )
    ) : null

  return <div className="add-img text-center">{googleAdEl || imageAdEl || null}</div>
}

export default Ads
