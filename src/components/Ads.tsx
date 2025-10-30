import React from "react"

interface AdsProps {
  image?: string
  link?: string
}

const Ads: React.FC<AdsProps> = ({ image, link }) => {
  if (!image) return null

  return (
    <div className="ad-container text-center">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={image}
            alt="ad"
            style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        </a>
      ) : (
        <img
          src={image}
          alt="ad"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      )}
    </div>
  )
}

export default Ads