import type { CardInterface } from "../types";
import {
  Phone,
  CalendarCheck,
  Home,
  Building2,
  Users,
  UserPlus,
  Search,
  MessageSquare,
  TrendingUp,
  Target,
  Megaphone,
  RefreshCw,
  GitBranch,
  Globe,
  Key,
  Building,
  Wrench,
  ClipboardList,
} from "lucide-react";

// Real Estate Service Categories
export const SERVICE_CATEGORIES = {
  TOP_PERFORMING: "top-performing",
  BUYER_SERVICES: "buyer-services",
  SELLER_SERVICES: "seller-services",
  LEAD_MANAGEMENT: "lead-management",
  PROPERTY_MANAGEMENT: "property-management",
  SCHEDULING: "scheduling",
} as const;

export const mockCards: CardInterface[] = [
  // ============================================
  // TOP PERFORMING
  // ============================================
  {
    id: 1,
    title: "Prestige Living Agent",
    route: "prestige-living-agent",
    description:
      "Top-performing agent specializing in luxury properties, executive relocations, and high-end real estate services",
    imageUrl: "#14B8A6",
    icon: Building2,
    tags: ["Top Performer", "Luxury", "Executive"],
    agent_code: "049067f6-0a8b-4bec-a555-d0c1d336b717",
    category: SERVICE_CATEGORIES.TOP_PERFORMING,
  },
  {
    id: 2,
    title: "Global Estate Advisor",
    route: "global-estate-advisor",
    description:
      "Elite global real estate advisor with expertise in premium residential and commercial properties worldwide",
    imageUrl: "#0D9488",
    icon: Building2,
    tags: ["Top Performer", "Global", "Premium"],
    agent_code: "2fe4ea8d-827a-4b74-9f0e-30c64d703404",
    category: SERVICE_CATEGORIES.TOP_PERFORMING,
  },
  {
    id: 3,
    title: "Boutique Agency Pro",
    route: "boutique-agency-pro",
    description:
      "Premier boutique real estate agency specializing in distinctive properties and personalized client service",
    imageUrl: "#0F766E",
    icon: Building2,
    tags: ["Top Performer", "Boutique", "Premium"],
    agent_code: "8ce0c9cf-dffb-4006-8c45-83e6afda84dd",
    category: SERVICE_CATEGORIES.TOP_PERFORMING,
  },
  {
    id: 4,
    title: "Inbound Special Agent",
    route: "inbound-special-agent",
    description:
      "Top-tier inbound specialist handling high-value property inquiries with exceptional response times and conversion rates",
    imageUrl: "#115E59",
    icon: Building2,
    tags: ["Top Performer", "Inbound", "High-Value"],
    agent_code: "0aad00d5-02e4-4c30-be30-97df0c708fb5",
    category: SERVICE_CATEGORIES.TOP_PERFORMING,
  },
  {
    id: 5,
    title: "Buyer Real Estate Agent",
    route: "buyer-real-estate",
    description:
      "Elite buyer's agent specializing in matching discerning clients with their ideal properties through expert guidance",
    imageUrl: "#134E4A",
    icon: Building2,
    tags: ["Top Performer", "Buyers", "Expert"],
    agent_code: "7a8b6402-640f-4cba-b2c4-711abe76dfcb",
    category: SERVICE_CATEGORIES.TOP_PERFORMING,
  },

  // ============================================
  // BUYER SERVICES
  // ============================================
  {
    id: 6,
    title: "Property Inquiry Agent",
    route: "property-inquiry",
    description:
      "Handle inbound property inquiries, provide detailed listings info, and qualify buyer interest instantly",
    imageUrl: "#0EA5E9",
    icon: Home,
    tags: ["Inbound", "Buyers", "Inquiries"],
    agent_code: "6196fce4-36d5-4856-89fc-6c70b40f6545",
    category: SERVICE_CATEGORIES.BUYER_SERVICES,
  },
  {
    id: 7,
    title: "Buyer & Tenant Inquiry Agent",
    route: "buyer-tenant-inquiry",
    description:
      "Engage buyers and tenants with personalized responses, property recommendations, and availability checks",
    imageUrl: "#06B6D4",
    icon: Users,
    tags: ["Inbound", "Buyers", "Tenants"],
    agent_code: "d2dfb1ff-de0c-4976-9236-f092ee75eab2",
    category: SERVICE_CATEGORIES.BUYER_SERVICES,
  },
  {
    id: 8,
    title: "Listing Questions Agent",
    route: "listing-questions",
    description:
      "Answer all listing-related queries, provide property details, pricing info, and neighborhood insights",
    imageUrl: "#0284C7",
    icon: MessageSquare,
    tags: ["Inbound", "Listings", "Support"],
    agent_code: "939b0f36-a24b-4003-9440-603a46fbe563",
    category: SERVICE_CATEGORIES.BUYER_SERVICES,
  },
  {
    id: 9,
    title: "Rental Inquiry Agent",
    route: "rental-inquiry",
    description:
      "Handle rental inquiries, screen potential tenants, and provide lease information efficiently",
    imageUrl: "#0891B2",
    icon: Key,
    tags: ["Rentals", "Tenants", "Inquiries"],
    agent_code: "327c5c43-50a4-4100-9229-6295aa6db50d",
    category: SERVICE_CATEGORIES.BUYER_SERVICES,
  },

  // ============================================
  // SELLER SERVICES
  // ============================================
  {
    id: 10,
    title: "Seller & Landlord Sourcing",
    route: "seller-sourcing",
    description:
      "Proactively reach property owners, pitch listing services, and secure new inventory for your portfolio",
    imageUrl: "#10B981",
    icon: UserPlus,
    tags: ["Outbound", "Sellers", "Acquisition"],
    agent_code: "2dc74f2f-c431-46f7-8c80-be898764971b",
    category: SERVICE_CATEGORIES.SELLER_SERVICES,
  },
  {
    id: 11,
    title: "Demand Generation Agent",
    route: "demand-generation",
    description:
      "Generate buyer and renter demand through targeted outbound campaigns and market engagement",
    imageUrl: "#059669",
    icon: TrendingUp,
    tags: ["Outbound", "Marketing", "Generation"],
    agent_code: "c61fe863-63df-40b7-b3b2-de6e03a25353",
    category: SERVICE_CATEGORIES.SELLER_SERVICES,
  },
  {
    id: 12,
    title: "Market-wide Prospecting",
    route: "market-prospecting",
    description:
      "Prospect across your entire market, identify opportunities, and build pipeline proactively",
    imageUrl: "#047857",
    icon: Globe,
    tags: ["Hybrid", "Prospecting", "Outbound"],
    agent_code: "c25f72e8-4e26-48c2-907d-dac7862a23cd",
    category: SERVICE_CATEGORIES.SELLER_SERVICES,
  },

  // ============================================
  // LEAD MANAGEMENT
  // ============================================
  {
    id: 13,
    title: "Lead Qualification Agent",
    route: "lead-qualification",
    description:
      "Score and qualify leads automatically, identify hot prospects, and route to the right agents",
    imageUrl: "#F59E0B",
    icon: Target,
    tags: ["Qualification", "Leads", "Scoring"],
    agent_code: "443f0aa7-fdcd-43bf-9888-02988b49c19e",
    category: SERVICE_CATEGORIES.LEAD_MANAGEMENT,
  },
  {
    id: 14,
    title: "Dormant Lead Re-engagement",
    route: "lead-reengagement",
    description:
      "Revive cold leads with personalized outreach, special offers, and market updates",
    imageUrl: "#D97706",
    icon: RefreshCw,
    tags: ["Outbound", "Re-engagement", "Leads"],
    agent_code: "447224d2-580e-4292-954a-6e2dcb474fbf",
    category: SERVICE_CATEGORIES.LEAD_MANAGEMENT,
  },
  {
    id: 15,
    title: "Intent Detection & Routing",
    route: "intent-routing",
    description:
      "Detect caller intent in real-time and intelligently route to specialized agents or departments",
    imageUrl: "#B45309",
    icon: GitBranch,
    tags: ["Hybrid", "Routing", "AI"],
    agent_code: "bab64b4d-abe5-49a3-bb45-b60ebaea159d",
    category: SERVICE_CATEGORIES.LEAD_MANAGEMENT,
  },

  // ============================================
  // PROPERTY MANAGEMENT
  // ============================================
  {
    id: 16,
    title: "Tenant Inquiry Agent",
    route: "tenant-inquiry",
    description:
      "Manage tenant communications, handle maintenance requests, and provide property management support",
    imageUrl: "#8B5CF6",
    icon: Phone,
    tags: ["Property Management", "Tenants", "Inbound"],
    agent_code: "169b7bd8-2fa6-431a-bba3-0c5319bb886c",
    category: SERVICE_CATEGORIES.PROPERTY_MANAGEMENT,
  },
  {
    id: 17,
    title: "HOA & Building Support",
    route: "hoa-support",
    description:
      "Handle condo association queries, building management issues, and community communications",
    imageUrl: "#7C3AED",
    icon: Building,
    tags: ["HOA", "Condo", "Support"],
    agent_code: "e3e24066-2071-45bf-b438-9071c8b31423",
    category: SERVICE_CATEGORIES.PROPERTY_MANAGEMENT,
  },
  {
    id: 18,
    title: "Maintenance Prioritization",
    route: "maintenance-priority",
    description:
      "Triage maintenance requests, prioritize urgent issues, and dispatch service teams efficiently",
    imageUrl: "#6D28D9",
    icon: Wrench,
    tags: ["Maintenance", "Priority", "Dispatch"],
    agent_code: "5ebe82c1-7ee0-4814-98b6-231d919332ef",
    category: SERVICE_CATEGORIES.PROPERTY_MANAGEMENT,
  },

  // ============================================
  // SCHEDULING
  // ============================================
  {
    id: 19,
    title: "Viewing Scheduler Agent",
    route: "viewing-scheduler",
    description:
      "Automate property viewing appointments, send reminders, and coordinate with agents seamlessly",
    imageUrl: "#EC4899",
    icon: CalendarCheck,
    tags: ["Scheduling", "Viewings", "Automations"],
    agent_code: "bfa2279e-ce96-498e-9888-bb749e16dde8",
    category: SERVICE_CATEGORIES.SCHEDULING,
  },
];
