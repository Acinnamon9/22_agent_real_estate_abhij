import type { CardInterface } from "../../types";
import { Mic, AudioLines } from "lucide-react";
import "./Card.css";

interface CardProps {
  card: CardInterface;
  isActive: boolean;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
  onAgentSelect?: (agent: CardInterface) => void;
  loadingAgentCode?: string | null;
}

export const Card: React.FC<CardProps> = ({
  card,
  isActive,
  handleStart,
  getAgentName,
  onAgentSelect,
  loadingAgentCode,
}) => {
  const Icon = card.icon;
  const isLoading = loadingAgentCode === card.agent_code;

  const handleCardClick = () => {
    if (onAgentSelect) {
      onAgentSelect(card);
    }
  };

  return (
    <div
      className={`card ${isActive ? "active" : ""}`}
      onClick={handleCardClick}
    >
      <div className="card-glow"></div>
      <div
        className="card-icon-wrapper"
        style={{ background: `linear-gradient(135deg, ${card.imageUrl} 0%, ${card.imageUrl}cc 100%)` }}
      >
        {!card.imageAlt ? (
          <Icon size={32} color="#FFFFFF" />
        ) : (
          <img className="card-avatar" src={card.imageAlt} alt="" />
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{card.title}</h3>
        </div>
        <p className="card-description">{card.description}</p>

        {card.tags && card.tags.length > 0 && (
          <div className="card-tags">
            {card.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="card-tag">{tag}</span>
            ))}
          </div>
        )}

        <button
          className="try-demo-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (loadingAgentCode) return;
            handleStart(card.agent_code);
            getAgentName(card.title);
          }}
          disabled={!!loadingAgentCode}
        >
          <span className="button-bg"></span>
          {isLoading ? (
            <>
              <AudioLines size={18} className="animate-pulse" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Mic size={18} />
              <span>Talk to Agent</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};