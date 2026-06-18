// Structured Solutions-page content parsed from "HALAPARK SOLUTIONS PAGE v14.pdf".
// 22 solutions across 7 groups. Each entry drives BOTH an "Our Solutions" card
// and its /solutions/<slug> detail page.
//
// Detail schema (extended for v14):
//   slug, group, eyebrow, title, intro,
//   howItOperates?         (string)
//   systemComponents?      (string[])  + systemComponentsHeading
//   systemsHeading, systems[]          (kept for back-compat; unused by v14 unless set)
//   benefitsHeading, benefits[]
//   problemHeading, problemBody
//   ctaLabel, ctaLink
//   image
// The shared "Advantages of Our Solutions" block is the same on every page and
// is stored once at sections.solutions.advantages (not per-detail).

const PLACEHOLDER = "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png";

// Shared advantages block (appears on every solution page).
export const SOLUTION_ADVANTAGES = {
  heading: "Advantages of Our Solutions",
  items: [
    { title: "Advanced Vehicle Recognition", description: "Capture vehicle details with high-accuracy ANPR technology, ensuring reliable identification and seamless parking access management 24/7." },
    { title: "Smart Access Control", description: "Automate vehicle entry and exit through intelligent authorization systems, reducing unauthorized parking and improving operational efficiency." },
    { title: "Enhanced Security", description: "Strengthen parking security with real-time monitoring, automated alerts, and complete visibility across your parking facilities." },
    { title: "Regulatory Compliance", description: "Support parking policies and access rules with configurable enforcement tools designed to maintain compliance and accountability." },
    { title: "Real-Time Analytics & Reporting", description: "Access live dashboards, occupancy insights, vehicle activity reports, and performance metrics through the HalaPark management platform." },
    { title: "Parking Asset Protection", description: "Protect valuable parking spaces from misuse while ensuring authorized users enjoy a smooth and hassle-free parking experience." },
  ],
};

export const SOLUTION_GROUPS = [
  "Smart Parking Ecosystem",
  "Digital Payments & User Experience",
  "Access & Enforcement Systems",
  "Property & Hospitality Solutions",
  "Commercial & Retail Solutions",
  "Large Infrastructure & City Solutions",
  "Mobility & Energy Integration",
];

// One object per solution. `card` describes the grid card; the rest is the page.
export const SOLUTIONS_V14 = [
  // ── 1. Smart Parking Ecosystem ──────────────────────────────────────────────
  {
    slug: "smart-ecosystem-integration",
    group: "Smart Parking Ecosystem",
    eyebrow: "Smart Ecosystem Integration",
    title: "A Unified, Intelligent Parking Ecosystem",
    intro: "HalaPark integrates seamlessly with leading technology and security platforms such as Hikvision, HikCentral, Dahua, ISS, SSK, and other supported systems, creating a unified and intelligent parking ecosystem that connects security, operations, and digital services in real time.",
    systemComponentsHeading: "System Components",
    systemComponents: [
      "Parking management platform",
      "CCTV & security systems",
      "Access control systems",
      "Integration APIs",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Eliminates system fragmentation between parking and security",
      "Enables centralized control of all surveillance and access points",
      "Improves incident detection and response time",
      "Enhances operational efficiency through unified monitoring",
      "Supports scalable deployment across multiple locations",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "A fully connected security and parking ecosystem that delivers real-time visibility, smarter surveillance, and centralized control across all operations, ensuring safer and more efficient parking environments.",
  },
  {
    slug: "seamless-integrations",
    group: "Smart Parking Ecosystem",
    eyebrow: "Seamless Integrations",
    title: "End-to-End Connected Infrastructure for Smart Parking",
    intro: "HalaPark connects with existing infrastructure to create a unified operational ecosystem without disrupting current systems. It integrates multiple technologies into one intelligent platform for centralized control and real-time operations.",
    systemComponentsHeading: "Integrated Systems",
    systemComponents: [
      "Mobile App (iOS / Android)",
      "Web Portal / Dashboard",
      "ANPR / Area Scanning Cameras",
      "eCam Security / Monitoring System",
      "View 360 System & Processing Unit",
      "QR / RFID / Mobile Access Devices",
      "Network Switch (Connectivity Backbone)",
    ],
    benefitsHeading: "Key Benefit",
    benefits: [
      "Unified control of all parking and building systems",
      "Eliminates data silos and system fragmentation",
      "Reduced operational complexity and manual effort",
      "Scalable architecture for future technologies",
      "Seamless integration with existing infrastructure",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Parking and facility systems are often disconnected, with separate platforms for payments, access control, CCTV, and building management. This creates operational inefficiencies, data silos, higher maintenance costs, and limited visibility. HalaPark unifies them into one connected platform.",
  },
  {
    slug: "ai-powered-anpr-parking-management",
    group: "Smart Parking Ecosystem",
    eyebrow: "AI-Powered ANPR Parking Management",
    title: "Drive In. Drive Out. No Tickets Required.",
    intro: "HalaPark Automated Gate Access Control provides intelligent vehicle access management using ANPR technology, smart barriers, QR validation, and centralized monitoring.",
    howItOperates: "Vehicles are identified and validated automatically through AI cameras, QR codes, RFID systems, and integrated access rules — enabling seamless and secure gate operations.",
    benefitsHeading: "Key Advantages",
    benefits: [
      "Ticketless Entry & Exit",
      "Reduced Congestion at Gates",
      "Real-Time Vehicle Monitoring",
      "Touchless Customer Experience",
      "Enhanced Security & Audit Trails",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Manual access systems often create bottlenecks, inconsistent security procedures, and inefficient vehicle processing. HalaPark modernizes gate operations through smart automation and AI-powered access control.",
  },

  // ── 2. Digital Payments & User Experience ───────────────────────────────────
  {
    slug: "smart-mobility-payments-platform",
    group: "Digital Payments & User Experience",
    eyebrow: "Smart Mobility Payments Platform",
    title: "Flexible Payment Options for Every Parking Journey",
    intro: "Deliver seamless, cashless, and fully integrated parking payments through multiple channels designed for convenience, speed, and operational efficiency — Top Up Wallet, dynamic QR (Scan. Pay. Go.), and Smart POS for attendants and valet teams.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Instant balance reloads with a secure HalaPark wallet",
      "Fast & secure digital payments",
      "Smart QR code authentication with automated access & validation",
      "No tickets, no waiting, no hassle",
      "Smart POS: card & cash acceptance with digital receipt printing",
      "Barrier control & live transaction monitoring",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Cash-based and fragmented payment channels slow down parking operations and frustrate users. HalaPark unifies wallet, QR, and POS payments into one fast, cashless, fully integrated platform.",
  },
  {
    slug: "smart-slot-reservation",
    group: "Digital Payments & User Experience",
    eyebrow: "Smart Slot Reservation",
    title: "Your Parking Experience, Anytime, Anywhere",
    intro: "Everything parking, in one place. Fast access, seamless payments, and complete control from your smartphone.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Guaranteed parking availability",
      "Parking reserved before arrival",
      "Book anytime via mobile app",
      "Instant booking confirmation",
    ],
    problemHeading: "Problems We Solve",
    problemBody: "Searching for parking at peak hours, uncertainty about availability, long wait times and traffic congestion, and missed opportunities due to full parking facilities.",
  },
  {
    slug: "parking-guidance-system",
    group: "Digital Payments & User Experience",
    eyebrow: "Parking Guidance System",
    title: "Real-Time Parking Navigation for Smarter Traffic Flow",
    intro: "HalaPark Parking Guidance System provides intelligent wayfinding and occupancy visibility to help drivers locate available parking quickly and efficiently.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Faster parking discovery for drivers",
      "Reduced search time and fuel consumption",
      "Improved vehicle flow and circulation",
      "Reduced internal traffic congestion",
      "Real-time occupancy visibility",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Drivers often spend unnecessary time searching for parking, causing congestion, delays, and frustration. HalaPark improves parking flow through intelligent guidance technology.",
  },

  // ── 3. Access & Enforcement Systems ─────────────────────────────────────────
  {
    slug: "parking-access-control-solutions",
    group: "Access & Enforcement Systems",
    eyebrow: "Parking Access Control Solutions",
    title: "Automated Parking Monitoring",
    intro: "Powered by eCam and View360, HalaPark helps prevent unauthorized parking through AI-powered monitoring and automated enforcement. The solution improves parking compliance, protects parking availability, and provides real-time visibility across parking areas.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Prevent unauthorized parking",
      "Real-time monitoring and alerts",
      "Automated violation detection",
      "Better space utilization",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Unauthorized parking and manual enforcement create congestion, parking misuse, and inefficient operations. HalaPark uses AI-powered monitoring and automated enforcement to keep parking spaces available, secure, and efficiently managed.",
  },
  {
    slug: "on-street-parking",
    group: "Access & Enforcement Systems",
    eyebrow: "On-Street Parking",
    title: "Smart Urban Parking for Modern Cities",
    intro: "HalaPark On-Street Parking transforms traditional roadside parking into a connected digital ecosystem powered by AI, automation, and real-time monitoring. Designed for municipalities, commercial districts, and smart city developments, the system improves traffic flow, streamlines enforcement, and delivers a seamless cashless parking experience.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Improves curbside parking efficiency and utilization",
      "Enhances enforcement and compliance",
      "Faster search time for available parking",
      "Supports smart city and digital infrastructure initiatives",
      "Better traffic flow in urban areas",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "On-street parking is often poorly managed, leading to illegal parking, traffic congestion, lack of available space visibility, and inefficient use of limited curbside areas. Manual enforcement and lack of real-time data make it difficult for cities to control demand and ensure smooth traffic flow.",
  },
  {
    slug: "multi-location-parking-control-platform",
    group: "Access & Enforcement Systems",
    eyebrow: "Multi-Location Parking Control Platform",
    title: "Smart, Centralized Parking Management Across Multiple Sites",
    intro: "A unified parking management system designed to control and monitor multiple parking locations from a single platform. It enables real-time visibility, automated operations, and consistent parking control across all sites, improving efficiency and reducing operational complexity.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Centralized control of all parking locations",
      "Better visibility of occupancy and performance",
      "Enhanced decision-making through consolidated data",
      "Reduced operational complexity and costs",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Managing parking across multiple locations often leads to inconsistent operations, limited visibility, and fragmented control systems. Operators struggle with coordination, monitoring, and maintaining uniform standards across all sites, resulting in inefficiency and higher operational costs.",
  },

  // ── 4. Property & Hospitality Solutions ─────────────────────────────────────
  {
    slug: "hotel-restaurant-parking-solutions",
    group: "Property & Hospitality Solutions",
    eyebrow: "Hotel & Restaurant Parking Solutions",
    title: "Seamless Guest Parking Experience for Hospitality Venues",
    intro: "HalaPark helps hotels, restaurants, cafés, and hospitality venues deliver a seamless parking experience while ensuring spaces remain available for genuine guests and customers. The solution includes the HalaPark Visitor Registration System, a tablet-based platform connected to the HalaPark Portal that enables guests to quickly register their vehicle details upon arrival.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Fast and convenient visitor registration",
      "Improved parking compliance and access control",
      "Accurate vehicle verification and record management",
      "Reduced manual administration",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Manual visitor parking processes often lead to registration errors, unauthorized parking, and operational inefficiencies. HalaPark digitizes visitor parking management to improve accuracy, enhance security, and create a smoother arrival experience for guests and visitors.",
  },
  {
    slug: "private-property-parking-solutions",
    group: "Property & Hospitality Solutions",
    eyebrow: "Private Property Parking Solutions",
    title: "Smart Parking for Residential & Real Estate Communities",
    intro: "HalaPark helps property owners, residential communities, mixed-use developments, and real estate operators efficiently manage parking through AI-powered monitoring, access control, and automated parking management. The solution ensures parking spaces remain available for residents, tenants, visitors, and authorized users while improving security and operational efficiency.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Resident and tenant parking management",
      "Visitor registration and access control",
      "Prevent unauthorized parking",
      "Improved security and compliance",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Private properties often face unauthorized parking, visitor management challenges, and inefficient parking allocation. HalaPark provides intelligent parking control and automated access management to protect parking assets, improve resident satisfaction, and streamline property operations.",
  },
  {
    slug: "worship-center-parking-solution",
    group: "Property & Hospitality Solutions",
    eyebrow: "Worship Center Parking Solution",
    title: "Seamless Parking for Mosques, Churches, and Temples",
    intro: "A smart and efficient parking management system designed specifically for mosques, churches, temples, and other places of worship. It ensures smooth vehicle flow during peak prayer or service times, reduces congestion, and provides a seamless parking experience for visitors through automated access control and real-time space management.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Smooth traffic flow during peak hours",
      "Optimized use of available parking space",
      "Faster entry and exit with automation",
      "Reduced congestion and waiting time",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Places of worship often face severe parking challenges during peak attendance times, such as overcrowding, traffic congestion, and lack of organized space allocation. Manual parking control leads to delays, confusion, and inefficient use of limited space, creating inconvenience for visitors and operational pressure for management.",
  },

  // ── 5. Commercial & Retail Solutions ────────────────────────────────────────
  {
    slug: "commercial-parking",
    group: "Commercial & Retail Solutions",
    eyebrow: "Commercial Parking",
    title: "Intelligent Parking Infrastructure for Commercial Properties",
    intro: "HalaPark Commercial Parking helps office towers, retail centers, hotels, and mixed-use developments optimize parking operations through AI-powered automation, smart access control, digital validation, and real-time analytics.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Maximizes parking space utilization in business and retail areas",
      "Reduces traffic congestion during peak working and shopping hours",
      "Improves entry and exit flow with organized parking systems",
      "Enables better revenue control through managed parking systems",
      "Provides scalable solutions for high-traffic commercial developments",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Commercial properties often face congestion, inefficient parking allocation, and disconnected operational systems. HalaPark improves operational efficiency and customer convenience through intelligent parking automation.",
  },
  {
    slug: "retail-shopping-center-parking-solution",
    group: "Commercial & Retail Solutions",
    eyebrow: "Retail & Shopping Center Parking Solution",
    title: "Smart, Efficient Parking for a Seamless Shopper Experience",
    intro: "A smart parking management system designed for malls, retail outlets, and shopping centers. It streamlines vehicle flow, reduces congestion, and improves parking efficiency through automation, real-time monitoring, and digital access control.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Reduces traffic congestion and long queues",
      "Improves parking space utilization",
      "Faster entry and exit with automation",
      "Supports smooth peak-hour traffic flow",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Retail and shopping centers often struggle with parking congestion, especially during peak hours and weekends. Limited visibility of available spaces, long entry and exit queues, and inefficient manual management lead to customer frustration, lost time, and reduced shopping experience.",
  },
  {
    slug: "event-parking-solution",
    group: "Commercial & Retail Solutions",
    eyebrow: "Event Parking Solution",
    title: "Smart, Scalable Parking for Smooth Event Experiences",
    intro: "A smart parking management system designed for concerts, exhibitions, sports venues, and large-scale events. It ensures fast vehicle movement, reduces congestion, and manages high traffic volumes efficiently through automated access, real-time space tracking, and centralized control.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Handles high traffic volumes efficiently",
      "Reduces entry and exit congestion",
      "Improved crowd and traffic flow control",
      "Better guest experience and reduced waiting time",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Events often generate sudden traffic surges that overwhelm parking facilities, resulting in long queues, delays, confusion, and a poor visitor experience. Manual parking operations struggle to efficiently manage high, fast-changing demand and maintain smooth traffic flow.",
  },
  {
    slug: "space-sharing",
    group: "Commercial & Retail Solutions",
    eyebrow: "Space Sharing",
    title: "Transform Underutilized Parking into Revenue Opportunities",
    intro: "HalaPark Space Sharing enables property owners and businesses to monetize unused parking spaces through a connected booking and management platform powered by real-time availability and digital access.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Increases revenue from underutilized parking spaces",
      "Enables dynamic and demand-based pricing",
      "Maximizes occupancy across different time periods",
      "Supports revenue sharing between property owners and operators",
      "Improves ROI for parking infrastructure",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Unused parking spaces often remain unmonetized while drivers struggle to find available parking. HalaPark connects available inventory with real-time demand through smart digital infrastructure.",
  },

  // ── 6. Large Infrastructure & City Solutions ────────────────────────────────
  {
    slug: "government-facilities-parking-solution",
    group: "Large Infrastructure & City Solutions",
    eyebrow: "Government Facilities Parking Solution",
    title: "Secure and Modern Public Sector Facilities",
    intro: "A secure and intelligent parking system designed to efficiently manage high-volume staff and visitor traffic in government premises. It enables automated access control using ANPR, RFID, and barrier systems, ensuring fast and authorized entry and exit. With real-time monitoring, centralized management, integrated surveillance, and cashless payments, the solution enhances security, reduces congestion, and ensures smooth and efficient parking operations.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Secure access control with ANPR, RFID, and barrier automation",
      "Efficient management of high visitor and staff parking demand",
      "Enhanced security with integrated CCTV and surveillance systems",
      "Optimized space utilization with live occupancy tracking",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Government facilities often face high traffic volume, inefficient manual parking operations, security risks, limited space control, and lack of real-time monitoring, leading to delays, congestion, and poor visitor experience.",
  },
  {
    slug: "smart-healthcare-parking-system",
    group: "Large Infrastructure & City Solutions",
    eyebrow: "Smart Healthcare Parking System",
    title: "Priority-Driven Parking for Patients, Staff & Emergency Vehicles",
    intro: "The Hospital Parking Solution is a smart, automated system that manages high hospital traffic with fast, safe access for patients, visitors, staff, and emergency vehicles. It uses ANPR and barrier control for seamless entry and exit, with priority lanes for ambulances. Real-time monitoring, smart guidance, cashless payments, and centralized management reduce congestion, improve security, and enhance overall hospital parking efficiency.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Dedicated zones for staff, patients, and visitors",
      "Cashless and contactless payment options",
      "Enhanced security with integrated surveillance systems",
      "Priority access for ambulances and emergency vehicles",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Hospitals face intense, around-the-clock traffic where delays can be critical. Manual systems cause congestion, slow emergency access, and poor space visibility. HalaPark delivers priority-driven, automated parking that keeps patients, staff, and emergency vehicles moving safely.",
  },
  {
    slug: "university-parking-management-solution",
    group: "Large Infrastructure & City Solutions",
    eyebrow: "University Parking Management Solution",
    title: "Smart, Secure & Efficient Campus Mobility System",
    intro: "A smart and efficient system designed to manage high volumes of student, staff, and visitor vehicles within campus environments. It automates entry and exit using ANPR and RFID technologies, reducing congestion and eliminating unauthorized access. With dedicated parking zones, real-time space monitoring, and smart guidance systems, users can quickly find available spaces even during peak hours.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Dedicated parking zones for faculty, students, and guests",
      "Advance booking",
      "Real-time parking availability and guidance",
      "Automated access for students, staff, and visitors using ANPR/RFID",
      "Reduced congestion during peak entry and exit times",
      "Centralized parking management dashboard",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Universities often face overcrowded parking areas, unauthorized vehicle entry, long search times for parking, traffic congestion during peak hours, and lack of visibility over student, staff, and visitor parking usage.",
  },
  {
    slug: "airport-parking-management-solution",
    group: "Large Infrastructure & City Solutions",
    eyebrow: "Airport Parking Management Solution",
    title: "Smart, Seamless & High-Capacity Travel Parking System",
    intro: "A smart, high-capacity parking system designed to handle continuous passenger flow and complex airport traffic operations. It automates entry and exit using ANPR and access control technologies, supports multiple parking zones (short-stay, long-stay, and VIP), and provides real-time visibility of parking availability.",
    benefitsHeading: "Key Benefits",
    benefits: [
      "Faster vehicle processing with automated ANPR access",
      "Reduced terminal congestion and smoother traffic flow",
      "Optimized use of short-stay, long-stay, and VIP parking zones",
      "Enhanced security through integrated surveillance systems",
      "Centralized control for efficient airport-wide management",
      "Seamless cashless payment and ticketless operations",
    ],
    problemHeading: "Problem We Solve",
    problemBody: "Airports struggle with heavy traffic congestion, limited parking visibility, and inefficient manual systems that cause long queues and delays. Travelers waste time searching for spaces, while high vehicle turnover pressures entry and exit points. Managing short-stay, long-stay, and VIP parking manually leads to poor space utilization, security challenges, and reduced passenger experience.",
  },

  // ── 7. Mobility & Energy Integration ────────────────────────────────────────
  {
    slug: "ev-charging-integration",
    group: "Mobility & Energy Integration",
    eyebrow: "EV Charging Integration",
    title: "Integrated EV Charging Infrastructure for Future Mobility",
    intro: "HalaPark EV Charging Integration combines smart parking operations with connected EV charging infrastructure to support sustainable and future-ready developments.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Seamless connection between parking and EV charging services",
      "Efficient energy and load management",
      "Supports sustainable and eco-friendly mobility infrastructure",
      "Scalable system for future expansion of EV networks",
      "Real-time availability and occupancy visibility",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Disconnected charging systems and limited EV infrastructure create operational complexity and poor user experiences. HalaPark simplifies EV mobility through integrated intelligent charging management.",
  },
  {
    slug: "fleet-parking-integration",
    group: "Mobility & Energy Integration",
    eyebrow: "Fleet Parking Integration",
    title: "Intelligent Fleet Mobility & Parking Management",
    intro: "HalaPark Fleet Parking Integration provides centralized parking management and intelligent mobility coordination for corporate fleets, logistics operators, commercial vehicles, and enterprise transportation environments. The platform enables automated fleet access, vehicle tracking, operational visibility, and optimized parking allocation across multiple locations.",
    benefitsHeading: "Key Benefit",
    benefits: [
      "Automated fleet identification using ANPR and access control",
      "Real-time tracking and monitoring of vehicle movements",
      "Dedicated parking allocation for fleet vehicles",
      "Centralized dashboard for full fleet visibility and control",
      "Optimized fleet utilization and operational efficiency",
    ],
    problemHeading: "The Problem We Solve",
    problemBody: "Traditional fleet parking operations often rely on manual coordination, disconnected access systems, and limited operational visibility — creating inefficiencies, delays, and poor fleet utilization. HalaPark modernizes fleet mobility through intelligent automation and centralized infrastructure management.",
  },
];

// Card grid metadata: short description (first sentence of intro is too long for a
// card, so we use a tight summary). Falls back to the eyebrow.
export const CARD_DESCRIPTIONS = {
  "smart-ecosystem-integration": "Unified parking + security ecosystem integrating Hikvision, Dahua, ISS and more in real time.",
  "seamless-integrations": "End-to-end connected infrastructure that unifies every parking and building system.",
  "ai-powered-anpr-parking-management": "Ticketless, AI-powered gate access with ANPR, smart barriers, and QR validation.",
  "smart-mobility-payments-platform": "Cashless wallet, dynamic QR, and smart POS payments for every parking journey.",
  "smart-slot-reservation": "Reserve and confirm parking before arrival, anytime, from your phone.",
  "parking-guidance-system": "Real-time wayfinding and occupancy visibility for smarter traffic flow.",
  "parking-access-control-solutions": "AI-powered monitoring and automated enforcement that prevents unauthorized parking.",
  "on-street-parking": "Smart, connected curbside parking for municipalities and smart cities.",
  "multi-location-parking-control-platform": "Centralized control and visibility across all your parking sites from one platform.",
  "hotel-restaurant-parking-solutions": "Seamless guest parking with tablet-based visitor registration for hospitality venues.",
  "private-property-parking-solutions": "AI-powered parking control for residential and real estate communities.",
  "worship-center-parking-solution": "Smooth, organized parking for mosques, churches, and temples during peak times.",
  "commercial-parking": "Intelligent parking automation for office towers, retail, and mixed-use developments.",
  "retail-shopping-center-parking-solution": "Smart parking that keeps malls and shopping centers flowing during peak hours.",
  "event-parking-solution": "Scalable parking that handles sudden event traffic surges with ease.",
  "space-sharing": "Monetize unused parking with real-time, demand-based booking.",
  "government-facilities-parking-solution": "Secure, automated parking for high-volume public sector facilities.",
  "smart-healthcare-parking-system": "Priority-driven hospital parking for patients, staff, and emergency vehicles.",
  "university-parking-management-solution": "Smart, secure campus mobility for students, staff, and visitors.",
  "airport-parking-management-solution": "High-capacity, seamless parking for short-stay, long-stay, and VIP airport zones.",
  "ev-charging-integration": "Integrated EV charging infrastructure for sustainable, future-ready mobility.",
  "fleet-parking-integration": "Centralized fleet parking and mobility coordination for enterprise transport.",
};

export const DEFAULT_DETAIL_IMAGE = PLACEHOLDER;
