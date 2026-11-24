export type Segment = string | { text: string; href: string };
export type Paragraph = Segment[];

export interface Job {
  date: string;
  endDate: string;
  role: string;
  company: string;
  url: string;
  description: string | null;
}

export interface Project {
  title: string;
  url: string;
  urlLabel: string;
  tagline: string;
  description: string[];
  stack: string[];
}

export const profile = {
  name: "Ian Luddy",
  tagline: "Building software at the speed of thought with AI",
  location: "Galway, Ireland",
  availability: "Available for contract work",
  email: "ianluddy@gmail.com",
  links: [
    { label: "ianluddy@gmail.com", href: "mailto:ianluddy@gmail.com" },
    { label: "github.com/ianluddy", href: "https://github.com/ianluddy" },
    { label: "linkedin.com/in/ianluddy", href: "https://ie.linkedin.com/in/ianluddy" },
  ],
};

export const about: Paragraph[] = [
  [
    "I'm a full-stack software builder from Galway with a passion for coding that started in 2008. I build software the way modern engineers should: AI-first, using ",
    { text: "Claude Code", href: "https://claude.ai/code" },
    " for engineering, ",
    { text: "Claude Design", href: "https://claude.ai/design" },
    " for UI, and ",
    { text: "Conductor", href: "https://conductor.build" },
    " to parallelise multiple agents across tasks simultaneously.",
  ],
  [
    "This lets me prototype, architect, and ship production systems dramatically faster than traditional workflows — exploring design tradeoffs, eliminating boilerplate, and maintaining high velocity without sacrificing code quality.",
  ],
  [
    "Outside of work I'm usually chilling with the family, dialling in coffee, playing tunes on the banjo, or walking the dog.",
  ],
];

// Most recent first
export const timeline: Job[] = [
  {
    date: "May 2025",
    endDate: "Present",
    role: "Senior Web Engineer",
    company: "Fin (formerly Intercom)",
    url: "https://fin.ai/",
    description: "Building out high-performance experiences across both Intercom — the best-in-class customer service platform — and its major AI pivot to Fin, an AI agent product that now powers millions of customer interactions. Work spans CMS integration, localisation for global markets, answer engine optimisation (AEO) to get Fin cited by AI search, full-stack observability tooling, on-call incident response, high-velocity feature shipping, and creating and maintaining Claude skills to maximise engineering workflow efficiency. The Fin pivot was capped by Salesforce's $3.6B acquisition of the company.",
  },
  {
    date: "Dec 2019",
    endDate: "May 2025",
    role: "Senior Web Engineer",
    company: "Zendesk",
    url: "http://www.zendesk.com/",
    description: "Led the experimentation program across marketing sites attracting ~2M visitors monthly, running 400+ A/B tests and personalisation campaigns. Collaborated with product and design to build out high-performance experiences and reusable design system components. Localised the site into 16 languages, managed full observability tooling including synthetic testing, and held lead responsibilities across engineering teams in EMEA and APAC.",
  },
  {
    date: "Dec 2018",
    endDate: "Dec 2019",
    role: "Senior Full Stack Developer",
    company: "Total Digital",
    url: "http://www.totaldigital.ie/",
    description: "Lead developer across diverse client projects from initial concept through to production, including Enterprise Ireland and DPD. Handled the full stack, mentored junior engineers, and managed ongoing client support.",
  },
  {
    date: "Jun 2016",
    endDate: "Dec 2018",
    role: "Senior Full Stack Developer",
    company: "Software Design",
    url: "http://www.softwaredesign.ie/",
    description: "Full stack development at the agency later rebranded as Total Digital — building and maintaining a wide variety of client projects across the full stack, from greenfield builds to production support.",
  },
  {
    date: "Jan 2016",
    endDate: "Jun 2016",
    role: "Senior Back End Developer",
    company: "Qualio",
    url: "http://www.qualio.com",
    description: "Lead Python developer on Qualio's SaaS Quality Management platform, built on Pyramid for pharma and life sciences organisations navigating FDA and ISO compliance. Refactored legacy code, developed a new API, and maintained high uptime on AWS.",
  },
  {
    date: "Oct 2012",
    endDate: "Jan 2016",
    role: "Lead Developer",
    company: "Arts Alliance Media",
    url: "http://www.artsalliancemedia.com/",
    description: "Led the Screenwriter team for three years — a Python Theatre Management System running on 40,000+ cinema screens globally, integrating with projection systems, POS, IP cameras, and onsite hardware. Responsible for hiring, training, worldwide deployments, and customer support.",
  },
  {
    date: "Aug 2011",
    endDate: "Oct 2012",
    role: "Python Developer",
    company: "Arts Alliance Media",
    url: "http://www.artsalliancemedia.com/",
    description: "Joined AAM as a Python developer on the Screenwriter project, building and maintaining features for a theatre management system deployed in cinemas worldwide. Promoted to team lead after a year.",
  },
  {
    date: "May 2011",
    endDate: "Aug 2011",
    role: "Back End Developer",
    company: "Avaeon",
    url: "http://www.avaeon.com/",
    description: "First role after graduating — C# developer enhancing an eCommerce platform facilitating insurance sales across the United States.",
  },
  {
    date: "Sep 2008",
    endDate: "May 2011",
    role: "BSc. (Hons) Software Development",
    company: "ATU",
    url: "http://www.atu.ie",
    description: "Graduated with First-Class Honours and won the Student of the Year award.",
  },
];

export const projects: Project[] = [
  {
    title: "Cuplift",
    url: "https://cuplift.app/",
    urlLabel: "cuplift.app",
    tagline: "AI-powered filter coffee brewing companion",
    description: [
      "A filter coffee companion app — import coffees by pasting a roaster URL or photographing the bag (Claude vision reads the label), then brew, score, and let the recipe engine dial in your parameters over time. Supports AeroPress, V60, Orea, Chemex and more; tracks grind, dose, temperature, water profile, and every sensory note across your brew history.",
    ],
    stack: ["Claude Code", "Conductor", "NextJS", "React", "Tailwind CSS", "Neon Postgres", "Drizzle ORM", "Claude AI", "Vercel"],
  },
  {
    title: "Fin",
    url: "https://fin.ai",
    urlLabel: "fin.ai",
    tagline: "Marketing site for Intercom's AI agent product",
    description: [
      "Next.js marketing site for Intercom's AI agent product, attracting 200k monthly visitors — high-velocity feature shipping with Claude Code and Conductor, experimentation with Eppo, Sanity for flexible content management, localisation for global markets through Lokalise and Lilt, and answer engine optimisation (AEO) so Fin is surfaced and cited by AI search tools like ChatGPT, Perplexity and Google AI Overviews. Hosted and deployed on Vercel, with full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Conductor", "NextJS", "Vercel", "Tailwind", "Eppo", "Datadog", "Sentry", "Sanity", "Lokalise", "Lilt"],
  },
  {
    title: "Intercom",
    url: "https://www.intercom.com",
    urlLabel: "intercom.com",
    tagline: "Marketing site for the leading customer service platform",
    description: [
      "Next.js marketing site for Intercom's customer service platform, attracting 600k monthly visitors — high-velocity feature shipping with Claude Code and Conductor, experimentation with Eppo, content management through Contentful, hosted and deployed on Vercel, with full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Conductor", "NextJS", "Vercel", "Tailwind", "Eppo", "Datadog", "Sentry", "Contentful"],
  },
  {
    title: "Zendesk",
    url: "https://www.zendesk.com",
    urlLabel: "zendesk.com",
    tagline: "Marketing site for Zendesk's customer service and CRM platform",
    description: [
      "Next.js marketing site for Zendesk's customer service and CRM platform, attracting 2 million monthly visitors across 16 localised languages — running on AWS, experimentation and personalisation via Optimizely, analytics via Hotjar, with full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Cursor", "NextJS", "React", "Optimizely", "Adobe Target", "Storybook", "Hotjar", "AWS", "Docker"],
  },
  {
    title: "Dylan Luddy",
    url: "https://www.dylanluddy.com",
    urlLabel: "dylanluddy.com",
    tagline: "Portfolio site for a digital marketer in London",
    description: [
      "Portfolio site for Dylan Luddy, a digital marketer based in London, showcasing his experience across SEO, paid media, and growth strategy — built with Next.js, Tailwind CSS, and Sanity CMS on Vercel.",
    ],
    stack: ["Claude Code", "Claude Design", "NextJS", "React", "Tailwind CSS", "Sanity CMS", "Vercel"],
  },
  {
    title: "Screenwriter",
    url: "https://www.artsalliancemedia.com/",
    urlLabel: "artsalliancemedia.com",
    tagline: "Theatre Management System running on 40,000+ cinema screens",
    description: [
      "Arts Alliance Media's flagship product — a Theatre Management System running on over 40,000 digital screens globally. I led the team for three years on this Python application with a browser-based front end, integrating with all major projection and audio systems, POS systems, IP cameras, and other cinema hardware.",
    ],
    stack: ["Python", "MongoDB", "Bootstrap", "AWS", "Docker", "Flask", "Django", "SQLAlchemy", "Handlebars"],
  },
  {
    title: "Ian & Claire",
    url: "https://ianandclaire.vercel.app/",
    urlLabel: "ianandclaire.com",
    tagline: "Wedding website with Google Forms RSVP",
    description: [
      "Wedding website built with Next.js, Google Fonts, and imagery from Etsy, with Google Forms handling guest RSVPs.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Forms", "Etsy"],
  },
  {
    title: "Enterprise Ireland",
    url: "https://www.enterprise-ireland.com/",
    urlLabel: "enterprise-ireland.com",
    tagline: "WordPress marketing site for Enterprise Ireland",
    description: [
      "WordPress marketing site for Enterprise Ireland, designed to promote Ireland's export strengths and connect Irish businesses with international markets.",
    ],
    stack: ["PHP", "WordPress", "WPML", "WPEngine", "AWS", "Docker"],
  },
  {
    title: "Health Connect",
    url: "https://healthconnect.ie",
    urlLabel: "healthconnect.ie",
    tagline: "Healthcare access platform for minority communities in Ireland",
    description: [
      "Health Connect is a multilingual WordPress platform making healthcare services accessible to minority and vulnerable communities across Ireland, with WPML-powered support for Polish, Chinese, Russian, and Arabic, plus Google Maps integration for service locations.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "Fontawesome", "AWS", "Docker"],
  },
  {
    title: "Baked Goodes",
    url: "https://bakedgoodes.vercel.app/",
    urlLabel: "bakedgoodes.ie",
    tagline: "E-commerce site for my wife's baking business",
    description: [
      "Fast, responsive Next.js site for a baking business, with Formik-powered order and inquiry forms and Sentry for error tracking.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Maps", "Sentry", "Formik", "Etsy"],
  },
  {
    title: "Qualio",
    url: "https://www.qualio.com/",
    urlLabel: "qualio.com",
    tagline: "SaaS Quality Management for pharma and life sciences",
    description: [
      "SaaS Quality Management platform built on the Pyramid framework for organisations in regulated industries like Pharma and Life Sciences.",
    ],
    stack: ["Python", "Pyramid", "PostgreSQL", "Gunicorn", "Nginx", "CircleCI", "AWS", "Docker"],
  },
  {
    title: "DPD — Manage Delivery",
    url: "https://dpd.ie/",
    urlLabel: "dpd.ie",
    tagline: "Delivery management portal used by thousands weekly",
    description: [
      "Delivery management web app integrated with DPD's portal backend — now used by thousands of people every week.",
    ],
    stack: [".NET", "Microsoft IIS", "SQL Server", "Postman"],
  },
  {
    title: "Weir & Sons",
    url: "https://weirandsons.ie",
    urlLabel: "weirandsons.ie",
    tagline: "eCommerce for a renowned Irish jeweller",
    description: [
      "eCommerce site for weirandsons.ie, a renowned Irish jewellery retailer, combining WordPress for the frontend with Magento for the backend.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Magento"],
  },
  {
    title: "Health Services Staffs Credit Union",
    url: "https://www.hsscu.ie/",
    urlLabel: "hsscu.ie",
    tagline: "WordPress site for Health Services Staffs Credit Union",
    description: [
      "Modern WordPress platform for the Health Services Staffs Credit Union, covering online banking, loan calculators, and financial resources, with SEO and analytics setup.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Bootstrap", "Slick Slider", "AWS", "Docker"],
  },
  {
    title: "Member First Credit Union",
    url: "https://www.mfcu.ie",
    urlLabel: "mfcu.ie",
    tagline: "Custom WordPress theme with loan calculator",
    description: [
      "Modern WordPress site for Member First Credit Union, with a custom loan calculator and AWS hosting for speed, scalability, and security.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "AWS", "Docker"],
  },
  {
    title: "Sparebace",
    url: "https://sparebace.vercel.app/",
    urlLabel: "sparebace.vercel.app",
    tagline: "Voice-enabled salon booking app",
    description: [
      "Built in response to a Barespace challenge — 'Transform the way salon bookings are made' — Sparebace is a voice-enabled chatbot booking experience built with Next.js 14, Prisma, PostgreSQL, and Stripe, deployed on Vercel with NeonDB for serverless database hosting.",
    ],
    stack: ["Claude Code", "Cursor", "Vercel", "NextJS", "React", "Prisma", "NeonDB", "PostgreSQL", "Stripe"],
  },
];
