// Seeds 3 sample solution detail pages in the NEW template shape (from the
// "Sample data.docx" reference). Updates existing details by slug (preserving
// image/group); inserts if absent. Non-destructive to other solutions.
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const SAMPLES = [
  {
    slug: "smart-ecosystem-integration",
    title: "Smart Ecosystem Integration",
    subtitle: "The Digital Backbone of Modern Parking Management",
    shortDescription:
      "Seamlessly connect parking operations, security systems, surveillance platforms, and access controls into one intelligent ecosystem.",
    ctaLabel: "Contact Us",
    whyHeading: "Why Smart Ecosystem Integration Matters?",
    whyBody:
      "HalaPark's Smart Ecosystem Integration creates a unified digital environment where parking management, security, surveillance, and access control systems work together seamlessly. By integrating leading technologies such as Hikvision, HikCentral, Dahua, ISS, SSK, and other compatible platforms, we eliminate operational silos and provide real-time visibility across your entire parking infrastructure.\n\nBuilt on a robust parking management platform supported by CCTV monitoring, access control systems, and flexible API integrations, our solution empowers operators with centralized control, enhanced security, and streamlined operations. Whether managing a single facility or multiple locations, HalaPark delivers a future-ready ecosystem designed for efficiency, scalability, and smarter decision-making.",
    problemHeading: "Problem We Face",
    problemBody:
      "Modern parking facilities often rely on multiple disconnected systems for security, surveillance, access control, and parking management. These fragmented platforms create operational inefficiencies, delayed incident response, limited visibility, and increased management complexity. Without a centralized ecosystem, operators struggle to monitor activities effectively, maintain security standards, and optimize overall facility performance.",
    solutionHeading: "Our Solution",
    solutionBody:
      "HalaPark addresses these challenges by integrating all critical parking and security technologies into one intelligent platform. Through seamless connectivity between surveillance systems, access control solutions, parking management software, and third-party integrations, operators gain a single source of truth for monitoring and managing their facilities. The result is enhanced security, improved operational efficiency, faster response times, and a smarter parking environment that adapts to evolving business needs.",
    benefitsHeading: "Key Benefits",
    keyBenefits: [
      { title: "Unified Operations", description: "Manage parking, security, and access control from a single platform." },
      { title: "Enhanced Security", description: "Gain real-time visibility and faster incident detection across all facilities." },
      { title: "Operational Efficiency", description: "Reduce manual processes and streamline day-to-day management." },
      { title: "Scalable Growth", description: "Easily expand and integrate additional locations and technologies." },
      { title: "Data-Driven Decisions", description: "Access consolidated insights and analytics for better operational planning." },
    ],
    howItWorksHeading: "How It Works",
    howItWorksBody:
      "HalaPark connects your existing parking management, CCTV surveillance, access control, and security platforms through a centralized integration framework. Data from all connected systems is synchronized in real time, allowing operators to monitor activities, manage access, receive alerts, and respond to incidents from a single dashboard. This seamless flow of information creates a smarter, safer, and more efficient parking ecosystem that supports both current operational needs and future expansion.",
    steps: [],
    relatedHeading: "Other Related Services",
    relatedServices: [],
  },
  {
    slug: "ai-powered-anpr-parking-management",
    title: "AI-Powered ANPR Parking Management",
    subtitle: "Intelligent Vehicle Recognition for Seamless Parking Operations",
    shortDescription:
      "Automate vehicle access, parking enforcement, and operational monitoring using advanced AI-powered Automatic Number Plate Recognition (ANPR) technology.",
    ctaLabel: "Contact Us",
    whyHeading: "Why AI-Powered ANPR Parking Management Matters?",
    whyBody:
      "Modern parking facilities require fast, secure, and automated vehicle management to handle increasing traffic volumes while maintaining operational efficiency. Traditional ticket-based and manually monitored parking systems often lead to congestion, unauthorized access, revenue leakage, and increased operational costs.\n\nHalaPark's AI-Powered ANPR Parking Management solution utilizes advanced artificial intelligence and license plate recognition technology to automatically identify, authenticate, track, and manage vehicles throughout the parking journey. By eliminating manual intervention and enabling real-time vehicle monitoring, operators gain complete visibility, improved security, enhanced user experience, and greater operational control.\n\nDesigned for commercial buildings, mixed-use developments, airports, hospitals, hotels, residential communities, government facilities, and smart cities, the solution delivers a future-ready parking ecosystem that improves efficiency while maximizing revenue and compliance.",
    problemHeading: "Problem We Face",
    problemBody:
      "Many parking facilities still rely on manual processes, access cards, paper tickets, or disconnected systems to manage vehicle entry and exit. These outdated methods often result in long queues, inaccurate records, security vulnerabilities, unauthorized parking, and inefficient resource utilization.\n\nWithout automated vehicle recognition and real-time monitoring, operators face challenges in enforcing parking policies, managing subscriptions, identifying violations, and maintaining a seamless parking experience. The lack of centralized vehicle intelligence can also impact revenue collection, customer satisfaction, and overall operational performance.",
    solutionHeading: "Our Solution",
    solutionBody:
      "HalaPark's AI-Powered ANPR Parking Management solution automatically captures and recognizes vehicle license plates at entry and exit points using intelligent cameras and AI-driven analytics. The system instantly validates authorized vehicles, calculates parking durations, manages access permissions, and records all vehicle movements in real time.\n\nIntegrated with parking management systems, barriers, payment gateways, surveillance platforms, and access control solutions, the platform creates a fully automated parking environment. Operators benefit from centralized management, enhanced security, automated enforcement, and accurate reporting while providing drivers with a frictionless and ticketless parking experience.\n\nThe solution can be deployed for both indoor and outdoor parking facilities and can scale across multiple locations through centralized cloud or enterprise management platforms.",
    benefitsHeading: "Key Benefits",
    keyBenefits: [
      { title: "Touchless Vehicle Access", description: "Enable automatic vehicle entry and exit without tickets, access cards, or manual intervention." },
      { title: "Enhanced Security & Monitoring", description: "Track all vehicle movements in real time and identify unauthorized or suspicious activities instantly." },
      { title: "Improved Traffic Flow", description: "Reduce congestion and waiting times through faster vehicle processing and automated access control." },
      { title: "Increased Revenue Protection", description: "Eliminate revenue leakage with accurate vehicle tracking, automated billing, and parking enforcement." },
      { title: "Smart Analytics & Reporting", description: "Access real-time dashboards, vehicle statistics, occupancy data, and operational insights for better decision-making." },
    ],
    howItWorksHeading: "How It Works",
    howItWorksBody: "",
    steps: [
      { title: "Vehicle Detection", description: "ANPR cameras automatically detect approaching vehicles at entry and exit points." },
      { title: "License Plate Recognition", description: "AI-powered algorithms capture and accurately recognize vehicle registration numbers." },
      { title: "Vehicle Verification", description: "The system validates the vehicle against authorized, subscription, visitor, blacklist, or whitelist databases." },
      { title: "Automated Access Control", description: "Approved vehicles receive automatic barrier access while unauthorized vehicles trigger alerts." },
      { title: "Parking Session Management", description: "Vehicle movements, parking duration, occupancy status, and transactions are recorded in real time." },
      { title: "Reporting & Analytics", description: "Operators access centralized dashboards, reports, alerts, and business intelligence tools for complete operational visibility." },
    ],
    relatedHeading: "Other Related Services",
    relatedServices: [],
  },
  {
    slug: "monitoring-guidance-circulation-systems",
    title: "Monitoring & Guidance Circulation Systems",
    subtitle: "Optimize Traffic Flow and Enhance Parking Efficiency",
    shortDescription:
      "Monitor vehicle movements in real time and guide drivers to available parking spaces through intelligent circulation and parking guidance technologies.",
    ctaLabel: "Contact Us",
    whyHeading: "Why Monitoring & Guidance Circulation Systems Matter?",
    whyBody:
      "Efficient vehicle circulation is essential for delivering a smooth parking experience and maximizing parking facility performance. Drivers often spend valuable time searching for available parking spaces, creating congestion, unnecessary vehicle emissions, driver frustration, and operational inefficiencies.\n\nHalaPark's Monitoring & Guidance Circulation Systems provide real-time visibility into parking occupancy and vehicle movement throughout the facility. Using intelligent sensors, cameras, digital signages, and AI-powered monitoring tools, the solution directs drivers to available spaces quickly while enabling operators to monitor traffic flow, reduce congestion, and optimize parking utilization.\n\nThe result is a smarter parking environment that improves customer satisfaction, enhances operational efficiency, and supports data-driven facility management.",
    problemHeading: "Problem We Face",
    problemBody:
      "Many parking facilities lack visibility into vehicle movement and parking occupancy. Drivers frequently circle parking areas searching for vacant spaces, leading to traffic bottlenecks, wasted time, increased fuel consumption, and poor visitor experiences.\n\nWithout real-time guidance and circulation monitoring, operators face difficulties in managing traffic flow, identifying congestion areas, and maximizing parking space utilization.",
    solutionHeading: "Our Solution",
    solutionBody:
      "HalaPark's Monitoring & Guidance Circulation Systems utilize smart sensors, AI cameras, occupancy detection technologies, and digital guidance displays to provide real-time parking availability information throughout the facility.\n\nThe system continuously monitors vehicle circulation patterns, occupancy levels, and traffic conditions. Drivers are guided to available spaces through dynamic signage and mobile integrations, while operators gain access to centralized dashboards for monitoring performance, congestion points, and parking trends.\n\nThis intelligent ecosystem improves traffic circulation, reduces search times, and creates a seamless parking experience.",
    benefitsHeading: "Key Benefits",
    keyBenefits: [
      { title: "Faster Parking Experience", description: "Guide drivers directly to available parking spaces with minimal searching." },
      { title: "Reduced Traffic Congestion", description: "Improve vehicle circulation and eliminate bottlenecks within parking facilities." },
      { title: "Higher Space Utilization", description: "Maximize occupancy rates through real-time parking availability management." },
      { title: "Enhanced Customer Satisfaction", description: "Reduce driver frustration and improve overall visitor experience." },
      { title: "Real-Time Operational Visibility", description: "Monitor parking activity, traffic flow, and occupancy levels from a centralized dashboard." },
    ],
    howItWorksHeading: "How It Works",
    howItWorksBody: "",
    steps: [
      { title: "Occupancy Detection", description: "Sensors and AI cameras detect parking space availability in real time." },
      { title: "Data Processing", description: "The system analyzes occupancy and circulation data continuously." },
      { title: "Driver Guidance", description: "Digital signages and guidance displays direct drivers to available parking zones and spaces." },
      { title: "Traffic Monitoring", description: "Vehicle movement and circulation patterns are monitored throughout the facility." },
      { title: "Performance Analytics", description: "Operators access reports, occupancy statistics, and traffic flow analytics." },
      { title: "Continuous Optimization", description: "Operational insights help improve circulation strategies and parking efficiency." },
    ],
    relatedHeading: "Other Related Services",
    relatedServices: [],
  },
];

// Cross-link the three samples to each other for the "Other Related Services" demo.
const slugs = SAMPLES.map((s) => s.slug);
SAMPLES.forEach((s) => { s.relatedServices = slugs.filter((x) => x !== s.slug); });

const run = async () => {
  const { Page } = await import("./src/models/Page.js");
  await mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ slug: "solutions" });
  const details = Array.isArray(page.sections.details) ? page.sections.details : [];

  let updated = 0, inserted = 0;
  for (const sample of SAMPLES) {
    const idx = details.findIndex((d) => d.slug === sample.slug);
    if (idx >= 0) {
      // Preserve existing image / group / eyebrow / ar; overwrite template fields.
      const prev = details[idx];
      details[idx] = {
        ...prev,
        ...sample,
        image: prev.image && prev.image !== "/image.png" ? prev.image : (prev.image || "/image.png"),
        group: prev.group || "",
        eyebrow: prev.eyebrow || sample.title,
        ctaLink: prev.ctaLink || "/contact",
        ar: prev.ar || {},
      };
      updated++;
    } else {
      details.push({ ...sample, image: "/image.png", group: "", eyebrow: sample.title, ctaLink: "/contact", ar: {} });
      inserted++;
    }
  }
  page.sections.details = details;
  page.markModified("sections");
  await page.save();

  console.log(`Samples seeded — updated: ${updated}, inserted: ${inserted}, total details: ${details.length}`);
  slugs.forEach((s) => {
    const d = details.find((x) => x.slug === s);
    console.log(`  /solutions/${s} — keyBenefits:${d.keyBenefits.length} steps:${d.steps.length} related:${d.relatedServices.length}`);
  });
  await mongoose.connection.close();
};

run().catch((e) => { console.error(e.message); process.exit(1); });
