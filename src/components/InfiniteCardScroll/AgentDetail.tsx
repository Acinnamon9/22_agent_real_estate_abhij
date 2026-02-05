import React from 'react';
import { ArrowLeft, Mic, Star, Users, Clock, Award, Phone, Zap, CheckCircle, AudioLines } from 'lucide-react';
import type { CardInterface } from '../../types';
import './AgentDetail.css';

interface AgentDetailProps {
  agent: CardInterface;
  onBack: () => void;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
  loadingAgentCode?: string | null;
}

// Complete agent details for all real estate agents
const agentDetails: Record<string, {
  fullDescription: string;
  features: string[];
  useCases: string[];
  stats: {
    satisfaction: string;
    responseTime: string;
    metric: string;
  };
}> = {
  // ... (keeping existing data object) ...
  "Prestige Living Agent": {
    fullDescription: "Elite luxury real estate agent specializing in high-end properties, executive relocations, and premium client services. Delivers white-glove service to discerning buyers and sellers in the executive and luxury market segments with exceptional attention to detail and market expertise.",
    features: [
      "Luxury property portfolio management",
      "Executive relocation coordination",
      "High-net-worth client specialist",
      "Premium market analysis & insights",
      "Confidential transaction handling"
    ],
    useCases: [
      "Handle luxury property inquiries",
      "Coordinate executive relocations",
      "Provide high-end market intelligence",
      "Manage premium listings portfolio",
      "Facilitate confidential transactions"
    ],
    stats: {
      satisfaction: "99%",
      responseTime: "< 1 sec",
      metric: "5,000+ Transactions"
    }
  },
  "Global Estate Advisor": {
    fullDescription: "Globally renowned real estate consultancy providing exceptional service across premium residential, commercial, and investment properties. Leveraging international expertise and local market knowledge to deliver outstanding results for high-value clients worldwide.",
    features: [
      "Global property network access",
      "Premium residential & commercial expertise",
      "Investment property consulting",
      "International market intelligence",
      "Comprehensive property services"
    ],
    useCases: [
      "Handle international property inquiries",
      "Provide global market insights",
      "Coordinate cross-border transactions",
      "Manage premium property portfolios",
      "Deliver investment property analysis"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 1 sec",
      metric: "10,000+ Properties"
    }
  },
  "Boutique Agency Pro": {
    fullDescription: "Premier boutique real estate agency delivering personalized, concierge-level service for distinctive properties. Known for exceptional client relationships and deep local market expertise in exclusive neighborhoods and unique homes.",
    features: [
      "Boutique personalized service",
      "Distinctive property specialization",
      "Local market expertise",
      "Exclusive neighborhood access",
      "White-glove client experience"
    ],
    useCases: [
      "Handle unique property inquiries",
      "Provide exclusive market access",
      "Coordinate private viewings",
      "Deliver personalized consultations",
      "Facilitate off-market transactions"
    ],
    stats: {
      satisfaction: "99%",
      responseTime: "< 1 sec",
      metric: "3,500+ Clients"
    }
  },
  "Inbound Special Agent": {
    fullDescription: "Top-tier inbound specialist expertly managing high-value property inquiries with exceptional speed and conversion rates. Combines cutting-edge technology with personalized service to qualify leads and convert prospects into satisfied clients efficiently.",
    features: [
      "High-value inquiry management",
      "Exceptional response times",
      "Advanced lead qualification",
      "Multi-channel inquiry handling",
      "CRM integration & automation"
    ],
    useCases: [
      "Handle premium inbound inquiries",
      "Qualify high-value prospects instantly",
      "Provide immediate property information",
      "Convert inquiries to appointments",
      "Track and nurture incoming leads"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 1 sec",
      metric: "25,000+ Inquiries"
    }
  },
  "Buyer Real Estate Agent": {
    fullDescription: "Elite buyer's agent dedicated to matching discerning clients with their perfect properties through expert guidance, market knowledge, and negotiation prowess. Specializes in understanding client needs and delivering tailored property solutions that exceed expectations.",
    features: [
      "Expert buyer representation",
      "Personalized property matching",
      "Market analysis & insights",
      "Negotiation expertise",
      "End-to-end buyer support"
    ],
    useCases: [
      "Represent buyers in property search",
      "Match clients with ideal properties",
      "Provide market analysis & valuations",
      "Negotiate favorable purchase terms",
      "Guide through entire buying process"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 1 sec",
      metric: "8,000+ Buyers"
    }
  },
  "Property Inquiry Agent": {
    fullDescription: "AI-powered property inquiry agent that handles inbound calls about listings, provides detailed property information, checks availability, and qualifies buyer interest in real-time. Perfect for capturing leads 24/7 and ensuring no inquiry goes unanswered.",
    features: [
      "Instant property details & pricing",
      "Real-time availability checking",
      "Automated lead capture & CRM sync",
      "Neighborhood & amenity information",
      "Seamless agent handoff for hot leads"
    ],
    useCases: [
      "Handle after-hours property inquiries",
      "Provide instant listing information",
      "Capture and qualify leads automatically",
      "Answer pricing and availability questions",
      "Schedule follow-up calls with agents"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 2 sec",
      metric: "15,000+ Inquiries"
    }
  },
  "Buyer & Tenant Inquiry Agent": {
    fullDescription: "Comprehensive inbound agent designed to engage both buyers and tenants with personalized responses. Understands intent, provides tailored property recommendations, and checks availability instantly across your portfolio.",
    features: [
      "Dual buyer/tenant intent detection",
      "Personalized property matching",
      "Instant availability across portfolio",
      "Budget & preference filtering",
      "Automated viewing suggestions"
    ],
    useCases: [
      "Respond to website and call inquiries",
      "Match properties to buyer preferences",
      "Provide rental availability information",
      "Qualify leads by budget and timeline",
      "Book property tours automatically"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 3 sec",
      metric: "22,000+ Leads"
    }
  },
  "Listing Questions Agent": {
    fullDescription: "Expert inbound agent that handles all listing-related queries. Provides comprehensive property details, pricing information, neighborhood insights, and market comparisons to help buyers make informed decisions.",
    features: [
      "Detailed listing information",
      "Market comparison data",
      "Neighborhood analytics",
      "Pricing strategy insights",
      "Document & disclosure info"
    ],
    useCases: [
      "Answer detailed property questions",
      "Provide market analysis information",
      "Explain pricing and valuations",
      "Share neighborhood statistics",
      "Discuss listing terms and conditions"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 3 sec",
      metric: "18,000+ Queries"
    }
  },
  "Rental Inquiry Agent": {
    fullDescription: "Specialized rental inquiry agent that handles all aspects of rental property questions. Screens potential tenants, provides lease information, discusses terms, and qualifies renters based on your criteria.",
    features: [
      "Tenant pre-screening",
      "Lease terms explanation",
      "Rental requirements verification",
      "Application process guidance",
      "Move-in date coordination"
    ],
    useCases: [
      "Handle rental property inquiries",
      "Pre-screen potential tenants",
      "Explain lease terms and conditions",
      "Guide through application process",
      "Schedule rental showings"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 sec",
      metric: "12,000+ Rentals"
    }
  },
  "Seller & Landlord Sourcing": {
    fullDescription: "Proactive outbound agent that identifies and reaches property owners interested in selling or renting. Pitches your services, collects property details, and schedules listing appointments to grow your inventory.",
    features: [
      "Targeted owner outreach",
      "Property valuation discussions",
      "Service pitch & differentiation",
      "Appointment scheduling",
      "Follow-up automation"
    ],
    useCases: [
      "Reach FSBO and expired listings",
      "Contact potential landlords",
      "Pitch listing services proactively",
      "Schedule listing presentations",
      "Follow up with interested owners"
    ],
    stats: {
      satisfaction: "92%",
      responseTime: "< 4 sec",
      metric: "3,200+ Listings"
    }
  },
  "Demand Generation Agent": {
    fullDescription: "High-performance outbound agent focused on generating buyer and renter demand. Conducts targeted campaigns, qualifies interest, and fills your pipeline with ready-to-act prospects.",
    features: [
      "Targeted campaign execution",
      "Interest qualification",
      "Appointment setting",
      "Pipeline building",
      "Campaign analytics"
    ],
    useCases: [
      "Execute outbound campaigns",
      "Generate buyer interest",
      "Qualify renter prospects",
      "Set appointments with agents",
      "Build qualified pipeline"
    ],
    stats: {
      satisfaction: "90%",
      responseTime: "< 3 sec",
      metric: "12,000+ Generated"
    }
  },
  "Market-wide Prospecting": {
    fullDescription: "Comprehensive prospecting agent that covers your entire market. Identifies opportunities, reaches potential clients, and builds relationships proactively to establish market presence.",
    features: [
      "Market coverage campaigns",
      "Opportunity identification",
      "Relationship building",
      "Pipeline development",
      "Market intelligence"
    ],
    useCases: [
      "Prospect across market areas",
      "Identify selling opportunities",
      "Build client relationships",
      "Gather market intelligence",
      "Develop long-term pipeline"
    ],
    stats: {
      satisfaction: "88%",
      responseTime: "< 4 sec",
      metric: "50,000+ Contacts"
    }
  },
  "Lead Qualification Agent": {
    fullDescription: "Intelligent lead scoring agent that automatically qualifies incoming leads based on budget, timeline, motivation, and readiness. Routes hot leads to agents instantly while nurturing warm leads.",
    features: [
      "BANT qualification framework",
      "Real-time lead scoring",
      "Hot lead instant alerts",
      "CRM integration & updates",
      "Custom qualification criteria"
    ],
    useCases: [
      "Score leads by readiness level",
      "Identify hot leads for immediate action",
      "Qualify budget and timeline",
      "Route leads to appropriate agents",
      "Update CRM with lead status"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 2 sec",
      metric: "45,000+ Qualified"
    }
  },
  "Dormant Lead Re-engagement": {
    fullDescription: "Strategic outbound agent designed to revive cold and dormant leads. Uses personalized outreach with market updates, new listings, and special opportunities to re-ignite interest.",
    features: [
      "Personalized re-engagement scripts",
      "Market update sharing",
      "New listing alerts",
      "Interest re-qualification",
      "Appointment scheduling"
    ],
    useCases: [
      "Revive leads gone cold",
      "Share relevant market updates",
      "Present new matching listings",
      "Re-qualify interest and timeline",
      "Schedule follow-up appointments"
    ],
    stats: {
      satisfaction: "89%",
      responseTime: "< 3 sec",
      metric: "8,000+ Revived"
    }
  },
  "Intent Detection & Routing": {
    fullDescription: "Advanced hybrid agent with AI-powered intent detection. Analyzes caller needs in real-time and intelligently routes to the right specialist—whether buyer, seller, renter, or property management.",
    features: [
      "Real-time intent analysis",
      "Multi-department routing",
      "Priority escalation",
      "Context preservation",
      "Seamless warm transfers"
    ],
    useCases: [
      "Detect caller intent instantly",
      "Route to specialized agents",
      "Handle multi-intent calls",
      "Prioritize urgent requests",
      "Transfer with full context"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 1 sec",
      metric: "35,000+ Routed"
    }
  },
  "Tenant Inquiry Agent": {
    fullDescription: "Property management focused agent that handles existing tenant communications. Manages maintenance requests, answers policy questions, provides account information, and ensures tenant satisfaction.",
    features: [
      "Maintenance request handling",
      "Account balance inquiries",
      "Policy & lease questions",
      "Emergency routing",
      "Service request tracking"
    ],
    useCases: [
      "Log maintenance requests",
      "Answer tenant policy questions",
      "Provide rent balance information",
      "Route emergency calls",
      "Track service request status"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 2 sec",
      metric: "25,000+ Requests"
    }
  },
  "HOA & Building Support": {
    fullDescription: "Dedicated support agent for HOA, condo associations, and building management. Handles resident inquiries, policy questions, amenity bookings, and community communications.",
    features: [
      "Resident policy support",
      "Amenity booking system",
      "Community announcements",
      "Violation reporting",
      "Meeting coordination"
    ],
    useCases: [
      "Answer HOA policy questions",
      "Book community amenities",
      "Report violations or concerns",
      "Provide meeting information",
      "Handle resident communications"
    ],
    stats: {
      satisfaction: "91%",
      responseTime: "< 3 sec",
      metric: "15,000+ Residents"
    }
  },
  "Maintenance Prioritization": {
    fullDescription: "Smart maintenance triage agent that assesses, prioritizes, and dispatches service requests. Uses AI to determine urgency, allocate resources efficiently, and ensure critical issues are addressed.",
    features: [
      "Urgency assessment AI",
      "Automated dispatching",
      "Vendor coordination",
      "Status tracking",
      "Emergency escalation"
    ],
    useCases: [
      "Triage maintenance requests",
      "Prioritize by urgency level",
      "Dispatch appropriate vendors",
      "Track repair progress",
      "Handle emergency situations"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 sec",
      metric: "20,000+ Requests"
    }
  },
  "Viewing Scheduler Agent": {
    fullDescription: "Intelligent scheduling agent that automates property viewing appointments. Coordinates between buyers, agents, and properties to find optimal times, sends confirmations and reminders.",
    features: [
      "Smart calendar integration",
      "Automated confirmation & reminders",
      "Multi-property tour optimization",
      "Agent availability matching",
      "No-show reduction system"
    ],
    useCases: [
      "Schedule property viewings 24/7",
      "Send automated appointment reminders",
      "Reschedule or cancel appointments",
      "Coordinate multi-property tours",
      "Sync with agent calendars"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 2 sec",
      metric: "8,500+ Viewings"
    }
  }
};

export const AgentDetail: React.FC<AgentDetailProps> = ({
  agent,
  onBack,
  handleStart,
  handleEnd,
  getAgentName,
  loadingAgentCode
}) => {
  const Icon = agent.icon;
  const details = agentDetails[agent.title];
  const isLoading = loadingAgentCode === agent.agent_code;

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingAgentCode) return;
    handleStart(agent.agent_code);
    getAgentName(agent.title);
  };

  // Fallback if agent not in details
  if (!details) {
    return (
      <div className="agent-detail-container">
        <div className="agent-detail-header">
          <button
            className="back-button"
            onClick={onBack}
            aria-label="Back to agents"
          >
            <ArrowLeft size={20} />
            <span>Back to Agents</span>
          </button>
        </div>
        <div className="agent-detail-content">
          <div className="agent-hero">
            <div
              className="agent-hero-icon"
              style={{ background: `linear-gradient(135deg, ${agent.imageUrl} 0%, ${agent.imageUrl}cc 100%)` }}
            >
              <Icon size={48} className="text-white" />
            </div>
            <div className="agent-hero-info">
              <h1 className="agent-title">{agent.title}</h1>
              <p className="agent-description">{agent.description}</p>
            </div>
            <button
              className="try-demo-hero-button"
              onClick={handleTryDemo}
              disabled={!!loadingAgentCode}
            >
              {isLoading ? (
                <>
                  <AudioLines size={20} className="animate-pulse" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Phone size={20} />
                  <span>Talk to Agent</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-detail-container">
      <div className="agent-detail-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Back to agents"
        >
          <ArrowLeft size={20} />
          <span>Back to Agents</span>
        </button>
      </div>

      <div className="agent-detail-content">
        <div className="agent-hero">
          <div
            className="agent-hero-icon"
            style={{ background: `linear-gradient(135deg, ${agent.imageUrl} 0%, ${agent.imageUrl}cc 100%)` }}
          >
            <Icon size={48} className="text-white" />
          </div>
          <div className="agent-hero-info">
            <h1 className="agent-title">{agent.title}</h1>
            <p className="agent-description">{agent.description}</p>
          </div>
          <button
            className="try-demo-hero-button"
            onClick={handleTryDemo}
            disabled={!!loadingAgentCode}
          >
            {isLoading ? (
              <>
                <AudioLines size={20} className="animate-pulse" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Phone size={20} />
                <span>Talk to Agent</span>
              </>
            )}
          </button>
        </div>

        <div className="agent-stats">
          <div className="stat-card">
            <Star className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value">{details.stats.satisfaction}</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
          <div className="stat-card">
            <Clock className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value">{details.stats.responseTime}</div>
              <div className="stat-label">Avg. Response</div>
            </div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value">{details.stats.metric}</div>
              <div className="stat-label">Handled</div>
            </div>
          </div>
        </div>

        <div className="agent-details-grid">
          <div className="detail-section about-section">
            <h2 className="section-title">
              <Award size={24} />
              About This Agent
            </h2>
            <p className="section-description">{details.fullDescription}</p>
          </div>

          <div className="detail-section">
            <h2 className="section-title">
              <Zap size={24} />
              Key Features
            </h2>
            <ul className="feature-list">
              {details.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <CheckCircle size={18} className="feature-check" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2 className="section-title">
              <Users size={24} />
              Common Use Cases
            </h2>
            <ul className="use-case-list">
              {details.useCases.map((useCase, index) => (
                <li key={index} className="use-case-item">
                  <div className="use-case-number">{index + 1}</div>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to See It in Action?</h2>
            <p>Start a live conversation with this AI agent and experience real estate automation firsthand.</p>
            <button
              className="cta-button"
              onClick={handleTryDemo}
              disabled={!!loadingAgentCode}
            >
              {isLoading ? (
                <>
                  <AudioLines size={20} className="animate-pulse" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Phone size={20} />
                  <span>Start Live Demo</span>
                </>
              )}
            </button>
          </div>
          <div className="cta-visual">
            <div className="cta-rings">
              <div className="cta-ring ring-1"></div>
              <div className="cta-ring ring-2"></div>
              <div className="cta-ring ring-3"></div>
              <Mic size={32} className="cta-mic" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};