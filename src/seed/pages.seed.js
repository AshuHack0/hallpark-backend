import { FRONTEND_PAGES } from "../constants/pages.js";
import { Page } from "../models/Page.js";

const defaultHomeSlides = [
  {
    id: 1,
    cardImg: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    tag: "Smart Parking Made Simple",
    title:
      " Find, book, and manage parking spaces with HalaPark, the smart platform for drivers, businesses, and property owners",
    subtitle:
      "Hala Park enables property owners, developers, and operators to convert parking infrastructure into fully automated, revenue-generating assets powered by smart technology and AI-driven operations.",
    description:
      "Find, book, and manage parking spaces with HalaPark, the smart platform for drivers, businesses, and property owners.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    video: "/HalaParkVideo.mp4",
  },
  {
    id: 2,
    cardImg: "/3ca506f760b463d2f3eb686fb08621c5.jpg.jpeg",
    tag: "The Future of Parking Starts Here",
    title:
      "Experience seamless, cashless parking with real-time availability and smart access, all in one powerful platform",
    subtitle:
      "From single properties to large portfolios, Hala Park enables you to grow revenue streams, reduce operational costs, and future-proof your parking ecosystem.",
    description:
      "List your space in minutes and start earning effortlessly. Smart pricing and secure bookings ensure consistent returns.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
  },
  {
    id: 3,
    cardImg: "/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png",
    tag: "No More Parking Hassles.",
    title:
      "Quickly discover available parking, reserve your spot, and park stress-free with HalaPark.",
    subtitle: "Charging that fits your routine.",
    description:
      "Locate and reserve charging-enabled parking in one go. Power up while you go about your day, no extra stops needed.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
  },
  {
    id: 4,
    cardImg: "/valet on demand short image.png",
    tag: "Valet On Demand",
    title: "Walk In Like You Own the Place",
    subtitle: "Premium parking without the wait.",
    description:
      "Request a valet instantly and skip the hassle of finding a spot. Arrive, hand over, and move on, effortless from start to finish.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
  },
  {
    id: 5,
    cardImg: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    tag: "Barrier-Free Parking",
    title: "Blink and You're Already In",
    subtitle: "Seamless entry, zero friction.",
    description:
      "License plate recognition handles access automatically. No tickets, no delays, just drive in and out with ease.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  },
  {
    id: 6,
    cardImg: "/37ea36b9e2f10ae7848280afbc3236af.jpg.jpeg",
    tag: "Parking Management",
    title: "Less Chaos. More Control. More Revenue.",
    subtitle: "Everything managed from one place.",
    description:
      "Monitor, optimize, and scale operations across all locations. Smart insights and automation keep everything running at peak efficiency.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
  },
];

const defaultJobPosts = [
  {
    title: "Senior Valet Supervisor",
    department: "Operations",
    location: "Dubai, UAE",
    employmentType: "Full-Time",
    description:
      "Lead our valet team at premium locations across Dubai. Oversee daily operations, train new team members, and ensure exceptional customer service standards.",
    applyLabel: "Apply Now",
    applyMode: "form",
    applyLink: "",
  },
  {
    title: "CRM & Operations Specialist",
    department: "Customer Operations",
    location: "Dubai, UAE",
    employmentType: "Full-Time",
    description:
      "Support our CRM and operations team by managing bookings, resolving customer inquiries, and coordinating daily workflows across all HalaPark platforms.",
    applyLabel: "Apply Now",
    applyMode: "form",
    applyLink: "",
  },
];

const defaultCareersSections = {
  hero: {
    title: "Park Your Career in the Right Place",
    description:
      "At HalaPark, we're transforming the way people park, move, and experience mobility across the UAE. What started as a smarter approach to valet and parking services is growing into a technology-driven mobility ecosystem powered by innovation, AI, and exceptional customer experiences. If you're ambitious, passionate, and ready to be part of something exciting, we'd love to meet you. Whether you're welcoming customers, managing operations, building technology, or supporting our business behind the scenes, every role at HalaPark helps drive the future forward.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
  },
  building: {
    title: "We're Not Just Parking Cars.\nWe're Building Smarter Mobility.",
    paragraphs: [
      "At HalaPark, we're transforming the parking experience through technology, automation, and innovation. From AI-powered vehicle location to seamless digital parking solutions, we're creating smarter ways for people to move.",
      "Join a team that's challenging traditional parking, embracing new ideas, and building technology-driven solutions that make a real impact across the UAE. Build your career. Shape the future of mobility.",
    ],
  },
  opportunities: [
    {
      icon: "Briefcase",
      title: "Full-Time Valet Roles",
      description:
        "Join our professional valet team and work in premium locations across the UAE, delivering high-quality parking and vehicle handling services.",
      badge: "Full-Time",
    },
    {
      icon: "Headset",
      title: "CRM & Operations Support",
      description:
        "Join our Customer Relationship Management (CRM) and operations team to help manage bookings, support customers, and ensure smooth daily operations across all platforms.",
      badge: "Operations",
    },
    {
      icon: "Building2",
      title: "Office Team (Corporate & Professional Roles)",
      description:
        "Be part of our office team supporting a wide range of business functions including HR, recruitment, finance, marketing, business development, coordination, and other corporate roles that drive company growth and efficiency.",
      badge: "Corporate",
    },
  ],
  openPositions: {
    title: "Open Positions",
    subtitle: "Explore our current job openings and apply today",
    posts: defaultJobPosts,
  },
  whyJoin: {
    title: "Why Join Us?",
    subtitle: "Because Great Careers Need More Than Just a Job",
    bodyParagraph:
      "At HalaPark, we celebrate achievements, support each other's growth, and believe great ideas can come from anyone. We're building a workplace where people are empowered to learn, contribute, and succeed together. And we're just getting started.",
    reasons: [
      "Work with one of the UAE's growing mobility and technology companies",
      "Learn from industry professionals and experienced leaders",
      "Flexible opportunities for both full-time and freelance professionals",
      "Career development and growth opportunities",
      "Supportive and collaborative work culture",
      "Be part of exciting technology and innovation projects",
      "Make a real impact every single day",
    ],
  },
  cta: {
    title: "Ready to Take the Next Step?",
    subtitle: "Come Build It With Us.",
    description:
      "Whether you're looking for your first opportunity, your next challenge, or a place where your ideas can make a difference, HalaPark could be the perfect fit.",
    primaryCtaText: "Join Our Team",
    primaryCtaLink: "/contact",
    secondaryCtaText: "View Open Positions",
    secondaryCtaLink: "#open-positions",
  },
};

const defaultAboutSections = {
  hero: {
    title: "Smart Parking Beyond Expectations",
    tagline: "Intelligent Parking. Smarter Cities. Seamless Movement.",
    description:
      "HalaPark is a smart parking technology company delivering innovative solutions that simplify parking, improve mobility, and support smarter urban environments.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    primaryCtaText: "Partner With HalaPark",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Speak With Our Experts",
    secondaryCtaLink: "/contact",
  },
  mission: {
    title: "Our Mission",
    subtitle: "Creating Smarter Movement for Modern Cities",
    paragraphs: [
      "Our mission is to redefine parking and urban mobility through intelligent technology, seamless automation, and digital platforms. We aim to simplify movement and improve everyday convenience for drivers, businesses, and cities.",
      "HalaPark focuses on enhancing operational performance through smarter and more connected systems. We support the growth of modern communities and future-ready cities with scalable mobility solutions.",
    ],
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
  },
  vision: {
    title: "Our Vision",
    subtitle: "A Future Where Parking Feels Invisible",
    paragraphs: [
      "HalaPark envisions a future where parking is fully invisible and seamlessly integrated into city life. Vehicles will move effortlessly through intelligent, automated environments.",
      "Access, payments, and operations will be fully frictionless and data-driven. Smart infrastructure will quietly support cities in the background.",
      "We are building the foundation for smarter cities, EV adoption, and next-generation mobility systems.",
    ],
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
    card: {
      badge: "Our Vision",
      title: "A Future Where Parking Feels Invisible",
      subtitle: "Seamlessly integrated into the way cities move, operate, and evolve.",
      highlights: [
        { line1: "AI-Driven", line2: "Operations" },
        { line1: "Frictionless", line2: "Payments" },
        { line1: "Smart City", line2: "Ready" },
      ],
    },
  },
  story: {
    title: "Our Story",
    subtitle: "Built from a Vision to Simplify Urban Movement",
    paragraphs: [
      "HalaPark was founded to solve parking inefficiency in modern cities. Traditional systems created congestion, delays, and operational challenges.",
      "We saw the opportunity to transform parking through smart technology and automation. What started as a parking platform has grown into a complete mobility ecosystem.",
      "Today, we build intelligent solutions that improve urban movement and shape smarter cities.",
    ],
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
  },
  whatWeDo: {
    title: "What We Do",
    subtitle: "Smart Parking Solutions Designed for Modern Cities",
    intro:
      "HalaPark delivers intelligent parking and mobility solutions that seamlessly combine automation, AI technology, operations, infrastructure, and digital experiences into one unified platform.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    ecosystemItems: [
      "AI-Powered Parking Management",
      "Free Flow & Ticketless Parking",
      "Mobile Parking Applications",
      "Digital Payments & Wallet Systems",
      "Residential & Community Access Control",
      "Public & On-Street Parking Solutions",
      "Parking Guidance Systems",
      "Space Sharing & Monetization",
      "Digital Permit Management",
      "Real-Time Parking Analytics",
      "Smart Mobility Integrations",
      "EV & Future Mobility Readiness",
    ],
  },
  technology: {
    title: "Technology & Innovation",
    subtitle: "Intelligent Technology for Smarter Parking",
    body: "HalaPark delivers a complete smart parking ecosystem powered by an Admin Portal, Driver App, digital payments, access control, and real-time analytics. We help operators and property owners automate operations, manage permits, and gain real-time insights through connected cloud technology. Built for modern cities, HalaPark provides smart, secure, and scalable parking solutions that ensure seamless experiences.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    imageBadge: "AI-Powered Platform",
  },
  cta: {
    title: "Build the Future of Mobility With Us",
    description:
      "Partner with HalaPark to create smarter parking, seamless mobility, and future-ready cities.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    primaryCtaText: "Partner With HalaPark",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Speak With Our Experts",
    secondaryCtaLink: "/contact",
  },
};

export const defaultFaqSections = {
  hero: {
    eyebrow: "HELP CENTER",
    title: "Got Questions? We've Got Answers.",
    subtitle:
      "Find helpful information about HalaPark's smart parking solutions, system features, payments, access, and operations, all organized into easy-to-browse categories for a faster and smoother experience.",
    description: "",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
  },
  faqCategories: [
    {
      id: "paid-parking-account",
      title: "Paid Parking Account Management",
      icon: "WalletCards",
      items: [
        {
          id: "change-plate-paid",
          question: "How to change plate number for paid parking account?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1ZDbrr_bB9y3uB2-VNnSkI9fW56P82yTG",
          videos: [""],
        },
        {
          id: "check-existing-booking",
          question: "How to check my existing paid parking booking?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1e5gLtVx27AYwYMlu9jTwE7sfVm4F1Cz5",
          videos: [""],
        },
        {
          id: "self-parking-booking",
          question: "How to make a Self-parking booking?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/18Ie7jvmJ5MzRj6fBTPW3q8YEgdiRFvSW",
          videos: [""],
        },
        {
          id: "rebook-paid-parking",
          question: "How to rebook my paid parking booking?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1Uze0cs6hqJqdCs3i395Qta7X-92TiBn0",
          videos: [""],
        },
      ],
    },
    {
      id: "evc-parking-system",
      title: "EVC Parking System",
      icon: "PlugZap",
      items: [
        {
          id: "evc-tutorial",
          question: "EVC Parking Tutorial",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1Mx1TzRlH-9wVwntWkD9WCepZ7kIkQGLx",
          videos: [""],
        },
      ],
    },
    {
      id: "public-parking-bookings",
      title: "Public Parking Bookings (By City)",
      icon: "MapPin",
      items: [
        {
          id: "public-booking-sharjah",
          question: "How to make public booking in Sharjah?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1N1oVPUnG22RVdLs2Uvc4mWx2MeOvMiFb",
          videos: [""],
        },
        {
          id: "public-booking-dubai",
          question: "How to make public booking in Dubai?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1oL6dn5SwgBc-d-qsWVUZp-WoSxal0eDT",
          videos: [""],
        },
        {
          id: "public-booking-ajman",
          question: "How to make public booking in Ajman?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1shtXafKleLlFmPgM3wh1VnWj9YiGyKbq",
          videos: [""],
        },
        {
          id: "public-booking-abu-dhabi",
          question: "How to make public booking in Abu Dhabi?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/15mTj1O6IE08RuhdRJ_YrVbG0XGbGIFQT",
          videos: [""],
        },
      ],
    },
    {
      id: "tenant-management",
      title: "Tenant Management & Account Setup",
      icon: "KeyRound",
      items: [
        {
          id: "tenant-listing",
          question: "Tenant listing (How to rent out your parking slot?)",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/14J12IvJCPoOaZEIi006OGDccD-65nPYC",
          videos: [""],
        },
        {
          id: "use-tenant-application",
          question: "How to use tenant application?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1uZ8mFHyWZTKzSgOwKGPlSwGViSXQa64x",
          videos: [""],
        },
        {
          id: "change-plate-tenant",
          question: "How to change plate number in a tenant account?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1iPC0d4WoDWDbynLvpjBSvI5RlM0aKYlw",
          videos: [""],
        },
      ],
    },
    {
      id: "valet-services",
      title: "Valet Services",
      icon: "CarFront",
      items: [
        {
          id: "valet-on-demand",
          question: "How to make valet on-demand booking?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1dlxIRtqvpE19E0QkxnMCAdZ67dhXut1V",
          videos: [""],
        },
        {
          id: "book-valet-service",
          question: "How to book valet service?",
          answer: "",
          videoFolderUrl: "https://drive.google.com/drive/folders/1e58ZuWAEYUVf7V_HokyTjXCbQPyV0pGp",
          videos: [""],
        },
      ],
    },
    {
      id: "car-wash",
      title: "Car Wash FAQs",
      icon: "Droplets",
      items: [
        {
          id: "car-wash-services",
          question: "What car wash services does HalaPark provide?",
          answer:
            "HalaPark offers both exterior and interior car wash services designed to keep vehicles clean, maintained, and convenient for residents, tenants, visitors, and customers.",
        },
        {
          id: "exterior-included",
          question: "What is included in the exterior car wash service?",
          answer:
            "Exterior car wash services may include: exterior body wash, tire cleaning, window cleaning, exterior drying, and basic exterior detailing. Service inclusions may vary depending on the location and selected package.",
        },
        {
          id: "interior-included",
          question: "What is included in the interior car wash service?",
          answer:
            "Interior cleaning services may include: vacuum cleaning, dashboard wiping, interior dust removal, seat and carpet cleaning, and interior surface sanitization. Available services may vary by tower, location, or package selection.",
        },
        {
          id: "car-wash-cost",
          question: "How much does the car wash service cost?",
          answer:
            "Car wash pricing depends on the tower or property location and the type of service selected. Pricing may vary between locations and properties.",
        },
        {
          id: "prices-vary-tower",
          question: "Why do prices vary by tower or location?",
          answer:
            "Each property or tower may have different operational requirements, parking access conditions, facility management policies, and service configurations which can affect pricing.",
        },
        {
          id: "exterior-or-interior",
          question: "Can I choose only exterior or only interior cleaning?",
          answer:
            "Yes. Users can select either exterior cleaning, interior cleaning, or combined full-service packages depending on availability at the location.",
        },
        {
          id: "full-detailing",
          question: "Do you offer full car detailing services?",
          answer:
            "Selected locations may offer premium detailing or advanced cleaning services depending on operational availability.",
        },
        {
          id: "book-car-wash",
          question: "How do I book a car wash service?",
          answer:
            "Car wash services may be booked through the HalaPark mobile application, parking facility management, or on-site service requests.",
        },
        {
          id: "schedule-car-wash",
          question: "Can I schedule a car wash in advance?",
          answer:
            "Yes. Advance booking may be available depending on the location and service schedule.",
        },
        {
          id: "car-wash-duration",
          question: "How long does the car wash service take?",
          answer:
            "Service duration depends on vehicle size, cleaning package, service demand, and interior or exterior requirements.",
        },
        {
          id: "where-cleaned",
          question: "Where will my car be cleaned?",
          answer:
            "Vehicles are usually cleaned within designated parking or service areas approved by the property or tower management.",
        },
        {
          id: "hand-over-keys",
          question: "Do I need to hand over my car keys?",
          answer:
            "Key handover requirements may vary depending on the service type and operational setup at the location.",
        },
        {
          id: "car-wash-availability",
          question: "Is the car wash service available in all HalaPark locations?",
          answer:
            "Car wash availability depends on the participating property, tower, or parking facility.",
        },
        {
          id: "eco-friendly-products",
          question: "Are eco-friendly cleaning products used?",
          answer:
            "Some locations may use water-efficient or eco-friendly cleaning solutions depending on operational standards and property requirements.",
        },
        {
          id: "special-pricing",
          question: "Can residents and tenants receive special pricing?",
          answer:
            "No. Car wash service pricing is fixed and standardized across all HalaPark locations and client properties. The same pricing applies to all users, including residents, tenants, visitors, and customers.",
        },
        {
          id: "car-wash-support",
          question: "How can I contact support for car wash services?",
          answer:
            "Users can contact the HalaPark support team or participating property management for booking assistance, pricing inquiries, or service support.",
        },
      ],
    },
    {
      id: "fleet-business",
      title: "Fleet & Business Services",
      icon: "Truck",
      items: [
        {
          id: "fleet-vehicles",
          question: "Can fleet or business vehicles use the service?",
          answer:
            "Yes. HalaPark can support fleet vehicle cleaning and commercial vehicle service arrangements depending on the property setup.",
        },
      ],
    },
    {
      id: "parking-operations-support",
      title: "Parking Operations & Support",
      icon: "Headset",
      items: [
        {
          id: "not-satisfied",
          question: "What happens if I am not satisfied with the service?",
          answer:
            "Users may contact customer support or the service provider for assistance, review, or resolution regarding service quality concerns.",
        },
        {
          id: "enter-location",
          question: "How do I enter a HalaPark parking location?",
          answer:
            "HalaPark uses intelligent parking technologies such as ANPR (Automatic Number Plate Recognition), QR access, and automated entry systems to provide seamless parking access. Depending on the location setup, your vehicle may be detected automatically upon entry without requiring physical tickets or barriers.",
        },
        {
          id: "barrier-open-detection",
          question: "Will my vehicle still be detected if the barrier is open?",
          answer:
            "Yes. HalaPark's ANPR system can still detect any registered vehicle entry and exit even when barriers remain open for traffic flow management.",
        },
        {
          id: "session-not-showing",
          question: "Why is my parking session not showing immediately?",
          answer:
            "Parking sessions may take a few moments to synchronize across the system depending on network connectivity, traffic volume, or location infrastructure. If the session does not appear after some time, users can contact support for assistance.",
        },
        {
          id: "leave-location",
          question: "What happens when I leave the parking location?",
          answer:
            "Upon exit, the system automatically records the vehicle departure, calculates parking duration, and processes payment according to the parking location's rules and payment setup.",
        },
      ],
    },
    {
      id: "gcc-vehicle-access",
      title: "GCC Vehicle Registration & Access",
      icon: "ScanLine",
      items: [
        {
          id: "detect-gcc-plates",
          question: "Can HalaPark detect GCC vehicle plates?",
          answer:
            "Yes, HalaPark can detect GCC vehicle plates as long as the vehicle has a valid booking in the HalaPark system.",
        },
        {
          id: "gcc-not-detected",
          question: "What should I do if my GCC vehicle is not detected at entry?",
          answer:
            "Please ensure the vehicle is registered in your account. If the issue persists, contact support for assistance in updating your plate details.",
        },
        {
          id: "gcc-prior-registration",
          question: "Is prior registration required for GCC-registered vehicles?",
          answer:
            "Yes, GCC vehicles must be properly registered in the system to ensure smooth recognition and access at the parking barrier.",
        },
      ],
    },
    {
      id: "payment-billing",
      title: "Payment & Billing",
      icon: "BadgePercent",
      items: [
        {
          id: "payment-methods-supported",
          question: "What payment methods are supported?",
          answer:
            "HalaPark supports multiple digital payment methods including debit cards, credit cards, mobile wallets, QR payments, app-based payments, and integrated digital payment gateways depending on the parking location.",
        },
        {
          id: "payment-cashless",
          question: "Is payment cashless?",
          answer:
            "Many HalaPark locations support digital and cashless payments through integrated payment systems and mobile platforms.",
        },
        {
          id: "which-payment-method",
          question: "How do I know which payment method applies at a location?",
          answer:
            "Available payment methods are usually displayed through signage, the mobile application, payment kiosks, or digital instructions at the parking facility.",
        },
        {
          id: "qr-code-used-for",
          question: "What is the QR code used for?",
          answer:
            "QR codes may be used for parking payments, validation, parking access, digital ticketing, or quick redirection to parking session management tools.",
        },
        {
          id: "qr-not-working",
          question: "What should I do if the QR code is not working?",
          answer:
            "Users can try rescanning the code, checking internet connectivity, or using alternative payment methods available at the location. Support assistance may also be available through the app or operator contact channels.",
        },
        {
          id: "when-charged",
          question: "When will I be charged for parking?",
          answer:
            "Parking charges are typically calculated after the session ends based on parking duration, location pricing rules, and any applicable validations or memberships.",
        },
        {
          id: "how-much-charged",
          question: "How much will I be charged for parking?",
          answer:
            "Parking fees vary depending on the location, duration, operator pricing policy, and any active parking entitlements or free parking periods.",
        },
        {
          id: "incomplete-payment",
          question: "What happens if I don't complete payment?",
          answer:
            "Incomplete payments may result in pending balances, parking restrictions, or additional operational actions depending on the parking operator's policies.",
        },
        {
          id: "why-charged",
          question: "Why was I charged for parking?",
          answer:
            "Charges are generated based on vehicle entry and exit records, parking duration, applicable parking rates, and operational policies configured for the location.",
        },
        {
          id: "charged-twice",
          question: "Can I be charged twice for the same parking session?",
          answer:
            "HalaPark systems are designed to prevent duplicate charging. If users believe an incorrect charge occurred, they may contact support for verification and resolution.",
        },
        {
          id: "plate-recorded-incorrectly",
          question: "What if my vehicle plate was recorded incorrectly?",
          answer: "Users should contact customer support and provide correct vehicle details.",
        },
        {
          id: "multiple-payment-methods-linked",
          question: "What happens if multiple payment methods are linked?",
          answer:
            "The system may prioritize the default payment method selected within the user account or follow the payment configuration associated with the parking session.",
        },
        {
          id: "insufficient-balance",
          question: "What happens if my payment account has insufficient balance?",
          answer:
            "Users may receive payment failure notifications and may be required to complete payment through an alternative payment method.",
        },
        {
          id: "refund-incorrect-charge",
          question: "Can I request a refund for an incorrect charge?",
          answer:
            "Yes. Users may contact support to request a review of disputed or incorrect parking charges.",
        },
      ],
    },
    {
      id: "mobile-app-digital",
      title: "Mobile App & Digital Features",
      icon: "Smartphone",
      items: [
        {
          id: "need-app-to-park",
          question: "Do I need the HalaPark app to park?",
          answer:
            "Yes. The HalaPark app is required to access and manage your parking services, including vehicle registration, parking allocations, payments, and other parking-related features.",
        },
        {
          id: "app-benefits",
          question: "What are the benefits of using the HalaPark app?",
          answer:
            "The app allows users to manage vehicles, track parking sessions, view payment history, receive notifications, manage memberships, and access digital parking services.",
        },
        {
          id: "manage-multiple-vehicles-app",
          question: "Can I manage multiple vehicles in the app?",
          answer:
            "Yes, users can add and manage multiple vehicles in their account. Before using their allocated parking slot, they simply need to select or update which vehicle will be parked in that space.",
        },
        {
          id: "track-parking-history",
          question: "Can I track my parking history?",
          answer:
            "Yes. Parking history, payment records, and session details may be accessible through the HalaPark platform or application.",
        },
        {
          id: "notifications-alerts",
          question: "Can I receive parking notifications and alerts?",
          answer:
            "Yes. Users may receive alerts related to parking sessions, payments, account activity, and operational updates.",
        },
        {
          id: "update-vehicle-details",
          question: "How do I update my vehicle details?",
          answer:
            "Vehicle details can usually be updated directly through the user account settings within the application or platform.",
        },
        {
          id: "add-multiple-payment-methods",
          question: "Can I add multiple payment methods?",
          answer:
            "Yes. Users may be able to link multiple payment methods depending on platform capabilities.",
        },
        {
          id: "app-not-working",
          question: "What should I do if the app is not working?",
          answer:
            "Users can try updating the app, checking internet connectivity, restarting the device, or contacting customer support for assistance.",
        },
        {
          id: "account-payment-secure",
          question: "Is my account and payment information secure?",
          answer:
            "HalaPark uses secure digital systems and trusted payment integrations to help protect user accounts and payment information.",
        },
      ],
    },
    {
      id: "violations-enforcement",
      title: "Violations & Enforcement",
      icon: "TriangleAlert",
      items: [
        {
          id: "issue-fines",
          question: "Does HalaPark issue parking fines?",
          answer:
            "Parking enforcement policies depend on the parking operator, municipality, or property management authority.",
        },
        {
          id: "what-is-violation",
          question: "What counts as a parking violation?",
          answer:
            "Violations may include unauthorized parking, unpaid sessions, overstays, misuse of reserved spaces, or non-compliance with parking regulations.",
        },
        {
          id: "dispute-fine",
          question: "How do I dispute a parking fine or charge?",
          answer:
            "Users can contact customer support or the relevant parking operator with supporting details for review and dispute resolution.",
        },
        {
          id: "overstay-session",
          question: "What happens if I overstay my parking session?",
          answer:
            "Additional parking charges or operational actions may apply depending on the location's parking policy.",
        },
        {
          id: "parked-without-authorization",
          question: "What happens if a vehicle is parked without authorization?",
          answer:
            "Unauthorized vehicles may be subject to enforcement procedures according to property and parking regulations.",
        },
        {
          id: "unpaid-sessions-handled",
          question: "How are unpaid parking sessions handled?",
          answer:
            "Unpaid sessions may remain associated with the vehicle record until payment obligations are resolved.",
        },
      ],
    },
    {
      id: "technical-operations",
      title: "Technical & Operations",
      icon: "Settings2",
      items: [
        {
          id: "integrate-existing-systems",
          question: "Can HalaPark integrate with existing parking systems?",
          answer:
            "Yes. HalaPark is designed to integrate with existing parking hardware, access control systems, cameras, payment gateways, and mobility infrastructure.",
        },
        {
          id: "technical-requirements",
          question: "What are the technical requirements for installation?",
          answer:
            "Requirements vary depending on the project scope and may include cameras, network connectivity, access systems, payment integrations, and cloud infrastructure.",
        },
        {
          id: "multiple-sites-dashboard",
          question: "Can HalaPark support multiple parking sites under one dashboard?",
          answer:
            "Yes. Operators can manage multiple parking locations through centralized dashboards and operational management tools.",
        },
        {
          id: "scale-smart-cities",
          question: "How does HalaPark scale for large developments and smart cities?",
          answer:
            "HalaPark is designed to support scalable smart mobility environments including commercial developments, municipalities, residential communities, and enterprise operations.",
        },
        {
          id: "technical-downtime",
          question: "What happens during technical downtime?",
          answer:
            "Backup operational procedures and monitoring systems may be activated depending on the infrastructure configuration and deployment environment.",
        },
        {
          id: "anpr-accuracy",
          question: "How accurate is the ANPR detection system?",
          answer:
            "HalaPark uses advanced ANPR technologies designed to provide high vehicle recognition accuracy under supported operational conditions.",
        },
        {
          id: "offline-backup",
          question: "Does HalaPark support offline or backup operations?",
          answer:
            "Operational continuity options may vary depending on the project setup and infrastructure requirements.",
        },
        {
          id: "infrastructure-security",
          question: "How secure is HalaPark's parking infrastructure?",
          answer:
            "HalaPark uses monitored digital systems, secure integrations, and operational safeguards to support secure parking environments.",
        },
      ],
    },
  ],
};

function defaultSections(slug) {
  if (slug === "home") {
    return { hero: { slides: defaultHomeSlides } };
  }

  if (slug === "careers") {
    return defaultCareersSections;
  }

  if (slug === "about") {
    return defaultAboutSections;
  }

  if (slug === "faqs") {
    return defaultFaqSections;
  }

  return {
    hero: {
      eyebrow: slug.replace(/-/g, " ").toUpperCase(),
      title: FRONTEND_PAGES.find((p) => p.slug === slug)?.name ?? slug,
      subtitle: "Edit this page content from the HalaPark admin dashboard.",
      description: "",
      image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    },
  };
}

export async function seedPages() {
  for (const page of FRONTEND_PAGES) {
    const existing = await Page.findOne({ slug: page.slug }).lean();
    const isCareers = page.slug === "careers";
    const hasCareersContent =
      existing?.sections?.hero?.title &&
      Array.isArray(existing?.sections?.opportunities) &&
      existing.sections.opportunities.length > 0;
    const isAbout = page.slug === "about";
    const hasAboutContent =
      existing?.sections?.mission?.title &&
      Array.isArray(existing?.sections?.whatWeDo?.ecosystemItems) &&
      existing.sections.whatWeDo.ecosystemItems.length > 0;
    const isFaqs = page.slug === "faqs";
    const hasFaqContent =
      Array.isArray(existing?.sections?.faqCategories) &&
      existing.sections.faqCategories.length > 0;

    if (!existing) {
      await Page.create({
        slug: page.slug,
        name: page.name,
        path: page.path,
        sections: defaultSections(page.slug),
        published: true,
      });
      continue;
    }

    // Backfill careers content only when the document exists but has empty/generic sections.
    if (isCareers && !hasCareersContent) {
      await Page.updateOne({ slug: page.slug }, { $set: { sections: defaultCareersSections } });
    } else if (isCareers && !existing.sections?.openPositions) {
      await Page.updateOne(
        { slug: page.slug },
        { $set: { "sections.openPositions": defaultCareersSections.openPositions } },
      );
    } else if (
      isCareers &&
      Array.isArray(existing.sections?.openPositions?.posts) &&
      existing.sections.openPositions.posts.length === 0
    ) {
      await Page.updateOne(
        { slug: page.slug },
        { $set: { "sections.openPositions.posts": defaultJobPosts } },
      );
    }

    if (isAbout && !hasAboutContent) {
      await Page.updateOne({ slug: page.slug }, { $set: { sections: defaultAboutSections } });
    }

    // Backfill FAQ categories only when the document exists but has none yet.
    if (isFaqs && !hasFaqContent) {
      await Page.updateOne({ slug: page.slug }, { $set: { sections: defaultFaqSections } });
    }
  }
  console.log("Pages seeded");
}
