import { Card, getCardColor } from "../data/cards";

interface CardFaceProps {
  card: Card;
  label?: string;
  small?: boolean;
}

export default function CardFace({ card, label, small }: CardFaceProps) {
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
          textTransform: "uppercase"
        }}>
          {label}
        </div>
      )}
      <div style={{ fontSize: small ? 24 : 36, marginBottom: 8 }}>☯</div>
      <div style={{
        fontSize: small ? 11 : 14,
        fontWeight: 600,
        color: "#fff",
        lineHeight: 1.3
      }}>
        {card.name}
      </div>
      <div style={{
        fontSize: small ? 10 : 12,
        color: "rgba(255,215,0,0.8)",
        marginTop: 2
      }}>
        {card.nameZh}
      </div>
      {!small && (
        <div style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.5)",
          marginTop: 8,
          lineHeight: 1.4
        }}>
          {card.meaning}
        </div>
      )}
    </div>
  );
}
