// CardGrid.tsx
import React, { memo, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";
import { AgentDetail } from "./AgentDetail";
import type { CardInterface } from "../../types";
import RealEstateAgentVoice from "./RealEstateAgentVoice";
import {
  Home,
  DollarSign,
  Key,
  Target,
  Building,
  Megaphone,
  Sparkles,
  Phone,
  Award
} from "lucide-react";
import "./CardGrid.css";

// Category configuration with orange/black color theme
const categoryConfig: Record<string, {
  label: string;
  color: string;
  gradient: string;
  lightBg: string;
  icon: React.ElementType;
  description: string;
}> = {
  "top-performing": {
    label: "Top Performing",
    color: "#14B8A6",
    gradient: "linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)",
    lightBg: "rgba(20, 184, 166, 0.06)",
    icon: Award,
    description: "Elite agents with exceptional performance"
  },
  "buyer-services": {
    label: "Buyer Services",
    color: "#FF6B2C",
    gradient: "linear-gradient(135deg, #FF6B2C 0%, #FF8F5C 100%)",
    lightBg: "rgba(255, 107, 44, 0.06)",
    icon: Home,
    description: "Engage and convert property buyers"
  },
  "seller-services": {
    label: "Seller Services",
    color: "#E85A1B",
    gradient: "linear-gradient(135deg, #E85A1B 0%, #FF6B2C 100%)",
    lightBg: "rgba(232, 90, 27, 0.06)",
    icon: DollarSign,
    description: "Acquire listings and support sellers"
  },
  "rental-services": {
    label: "Rental Services",
    color: "#CC4A0F",
    gradient: "linear-gradient(135deg, #CC4A0F 0%, #E85A1B 100%)",
    lightBg: "rgba(204, 74, 15, 0.06)",
    icon: Key,
    description: "Manage rentals and tenant relations"
  },
  "lead-management": {
    label: "Lead Management",
    color: "#1A1A1A",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%)",
    lightBg: "rgba(26, 26, 26, 0.04)",
    icon: Target,
    description: "Qualify, route, and nurture leads"
  },
  "property-management": {
    label: "Property Management",
    color: "#4A4A4A",
    gradient: "linear-gradient(135deg, #4A4A4A 0%, #6B6B6B 100%)",
    lightBg: "rgba(74, 74, 74, 0.05)",
    icon: Building,
    description: "HOA, maintenance, and building ops"
  },
  "outbound-marketing": {
    label: "Outbound Marketing",
    color: "#FF8F5C",
    gradient: "linear-gradient(135deg, #FF8F5C 0%, #FFB088 100%)",
    lightBg: "rgba(255, 143, 92, 0.06)",
    icon: Megaphone,
    description: "Generate demand and prospect leads"
  },
};

// Order of categories for display
const categoryOrder = [
  "top-performing",
  "buyer-services",
  "seller-services",
  "rental-services",
  "lead-management",
  "property-management",
  "outbound-marketing",
];

interface CardGridProps {
  cards: CardInterface[];
  className?: string;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  showRealEstateAgentVoice?: boolean;
  sessionStatus?: string | undefined | null;
  loadingAgentCode?: string | null;
}

export const CardGrid: React.FC<CardGridProps> = memo(
  ({
    cards,
    className = "",
    handleStart,
    handleEnd,
    showRealEstateAgentVoice,
    sessionStatus,
    loadingAgentCode,
  }) => {
    const [selectedAgent, setSelectedAgent] = useState<CardInterface | null>(null);
    const [agentName, setAgentName] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>("top-performing");
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const openAgentDetail = (agent: CardInterface) => {
      setSelectedAgent(agent);
      setAgentName(agent.title);
      const cardElement = cardRefs.current[agent.id];
      cardElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const closeAgentDetail = () => {
      setSelectedAgent(null);
      setAgentName(null);
    };

    const getSelectedCardElement = (): HTMLElement | null => {
      if (!selectedAgent) return null;
      return cardRefs.current[selectedAgent.id] || null;
    };

    const hasCategories = cards && cards.length > 0 && cards.some((card) => card.category);

    const getGroupedCards = () => {
      if (!hasCategories) return {};
      return categoryOrder.reduce((acc, category) => {
        const categoryCards = cards.filter((card) => card.category === category);
        if (categoryCards.length > 0) {
          acc[category] = categoryCards;
        }
        return acc;
      }, {} as Record<string, CardInterface[]>);
    };

    const groupedCards = getGroupedCards();
    const totalAgents = cards.length;

    // Reorder categories based on active category
    const orderedCategories = useMemo(() => {
      const filtered = categoryOrder.filter(cat => groupedCards[cat]);
      if (!activeCategory) return filtered;

      // If a category is selected, only return that one
      return [activeCategory];
    }, [activeCategory, groupedCards]);

    const renderCard = (card: CardInterface, categoryColor: string, index: number, isActiveCategory: boolean) => (
      <motion.div
        key={card.id}
        ref={(el) => (cardRefs.current[card.id] = el)}
        className="card-grid-item"
        role="button"
        tabIndex={0}
        onClick={() => openAgentDetail(card)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openAgentDetail(card);
          }
        }}
        style={{ '--card-accent': categoryColor } as React.CSSProperties}
        initial={isActiveCategory ? { opacity: 0, y: 30, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: isActiveCategory ? index * 0.08 : 0,
          ease: "easeOut"
        }}
      >
        <Card
          card={card}
          isActive={false}
          handleStart={handleStart}
          handleEnd={handleEnd}
          getAgentName={setAgentName}
          onAgentSelect={() => { }}
          loadingAgentCode={loadingAgentCode}
        />
      </motion.div>
    );

    return (
      <AnimatePresence mode="wait">
        {selectedAgent ? (
          <motion.div
            key="agent-detail"
            className="agent-detail-wrapper"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AgentDetail
              agent={selectedAgent}
              onBack={closeAgentDetail}
              handleStart={handleStart}
              handleEnd={handleEnd}
              getAgentName={setAgentName}
              loadingAgentCode={loadingAgentCode}
            />
            {showRealEstateAgentVoice && (
              <RealEstateAgentVoice
                onClose={handleEnd}
                sessionStatus={sessionStatus}
                agentName={agentName ?? undefined}
                anchorElement={getSelectedCardElement()}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="card-grid"
            className={`card-grid-wrapper ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            {/* <div className="hero-section">
              <div className="hero-background">
                <div className="hero-gradient-orb orb-1"></div>
                <div className="hero-gradient-orb orb-2"></div>
                <div className="hero-gradient-orb orb-3"></div>
                <div className="hero-grid-pattern"></div>
              </div>
              <div className="hero-content">
                <div className="hero-badge">
                  <Sparkles size={14} />
                  <span>AI-Powered Real Estate</span>
                </div>
                <h1 className="hero-title">
                  Your AI Sales Team
                  <span className="hero-title-highlight"> That Never Sleeps</span>
                </h1>
                <p className="hero-subtitle">
                  Intelligent voice agents designed to handle every real estate conversation — from buyer inquiries to property management
                </p>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-value">{totalAgents}</span>
                    <span className="hero-stat-label">AI Agents</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="hero-stat-value">6</span>
                    <span className="hero-stat-label">Use Cases</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="hero-stat-value">24/7</span>
                    <span className="hero-stat-label">Availability</span>
                  </div>
                </div>
                <div className="hero-cta">
                  <Phone size={16} />
                  <span>Click any agent to try a live demo</span>
                </div>
              </div>
            </div> */}

            {/* Voice bar if active */}
            {showRealEstateAgentVoice && !selectedAgent && (
              <RealEstateAgentVoice
                onClose={handleEnd}
                sessionStatus={sessionStatus}
                agentName={agentName ?? undefined}
                anchorElement={
                  agentName
                    ? cardRefs.current[
                    cards.find((c) => c.title === agentName)?.id || ""
                    ] || null
                    : null
                }
              />
            )}

            {hasCategories ? (
              <div className="categories-container">
                {/* Section Header and Subheader */}
                <div className="categories-header">
                  <h2 className="categories-title">Your AI sales Team</h2>
                  <p className="categories-subtitle">Sales Demos, Marketing Demos, Property Management Demos</p>
                </div>

                {/* Category Navigation */}
                <div className="category-nav-wrapper">
                  <nav className="category-nav">
                    {categoryOrder.map((category) => {
                      const config = categoryConfig[category];
                      const categoryCards = groupedCards[category];
                      if (!categoryCards || categoryCards.length === 0) return null;
                      const IconComponent = config.icon;

                      return (
                        <motion.button
                          key={category}
                          type="button"
                          className={`category-nav-item ${activeCategory === category ? 'active' : ''}`}
                          style={{
                            '--nav-color': config.color,
                            '--nav-gradient': config.gradient,
                            '--nav-bg': config.lightBg
                          } as React.CSSProperties}
                          onClick={(e) => {
                            e.preventDefault();
                            if (activeCategory !== category) {
                              setActiveCategory(category);
                            }
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="nav-item-icon">
                            <IconComponent size={18} />
                          </div>
                          <div className="nav-item-content">
                            <span className="nav-item-label">{config.label}</span>
                            <span className="nav-item-count">{categoryCards.length} agents</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>

                {/* Category Sections */}
                <div className="category-sections">
                  <AnimatePresence mode="sync">
                    {orderedCategories.map((category) => {
                      const config = categoryConfig[category];
                      const categoryCards = groupedCards[category];
                      if (!categoryCards || categoryCards.length === 0) return null;
                      const IconComponent = config.icon;

                      return (
                        <motion.section
                          key={category}
                          id={category}
                          className="category-section"
                          style={{
                            '--section-color': config.color,
                            '--section-gradient': config.gradient,
                            '--section-bg': config.lightBg
                          } as React.CSSProperties}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            layout: { duration: 0.6, ease: "easeInOut" },
                            opacity: { duration: 0.3 },
                            y: { duration: 0.4 }
                          }}
                        >


                          <div className="category-cards">
                            {categoryCards.map((card, index) => renderCard(card, config.color, index, activeCategory === category))}
                          </div>
                        </motion.section>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="card-grid">
                {cards.map((card, index) => renderCard(card, "#FF6B2C", index, false))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

CardGrid.displayName = "CardGrid";