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
    }

    if (isAbout && !hasAboutContent) {
      await Page.updateOne({ slug: page.slug }, { $set: { sections: defaultAboutSections } });
    }
  }
  console.log("Pages seeded");
}
