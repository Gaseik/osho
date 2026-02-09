import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, getCardColor } from "../data/cards";
import { hasCardImage } from "../utils/imageLoader";

interface CardFaceProps {
  card: Card;
  label?: string;
  small?: boolean;
}

export default function CardFace({ card, label, small }: CardFaceProps) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const hasImage = hasCardImage(card.id) && !imageError;
  const cardName = t(`cards.${card.id}`);

  // Try to construct image path
  const getImagePath = () => {
    const paddedId = String(card.id).padStart(2, '0');
    const slug = card.name.toLowerCase().replace(/\s+/g, '-');
    return `/src/assets/cards/${paddedId}-${slug}.jpeg`;
  };

  // If card has image and no error, show the actual card image
  if (hasImage) {
    return (
      <div style={{
        width: small ? 100 : 140,
        height: small ? 150 : 210,
        borderRadius: 12,
        border: "1px solid rgba(255,215,0,0.5)",
        overflow: "hidden",
        boxShadow: "0 4px 25px rgba(0,0,0,0.5)",
        position: "relative",
        background: "#000",
      }}>
        <img
          src={getImagePath()}
          alt={card.name}
          onError={() => setImageError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  // Fallback: Show placeholder with gradient background
  return (
    <div style={{
      width: small ? 100 : 140,
      height: small ? 150 : 210,
      borderRadius: 12,
      background: getCardColor(card.id),
      border: "1px solid rgba(255,215,0,0.5)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: small ? 8 : 12,
      textAlign: "center",
      boxShadow: "0 4px 25px rgba(0,0,0,0.5)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 6,
        borderRadius: 8,
        border: "1px solid rgba(255,215,0,0.2)",
      }} />
      {label && (
        <div style={{
          fontSize: 10,
          color: "rgba(255,215,0,0.7)",
          marginBottom: 4,
          letterSpacing: 2,
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}>
          {label}
        </div>
      )}
      <div style={{ fontSize: small ? 24 : 36, marginBottom: 8, position: "relative", zIndex: 1 }}>☯</div>
      <div style={{
        fontSize: small ? 11 : 14,
        fontWeight: 600,
        color: "#fff",
        lineHeight: 1.3,
        position: "relative",
        zIndex: 1,
      }}>
        {cardName}
      </div>
      {!small && (
        <div style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.5)",
          marginTop: 8,
          lineHeight: 1.4,
          position: "relative",
          zIndex: 1,
        }}>
          {card.meaning}
        </div>
      )}
    </div>
  );
}
