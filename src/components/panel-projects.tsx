"use client";

import { useState, useEffect } from "react";
import { ScrambleText } from "@/components/scramble-text";

interface Project {
  title: string;
  url: string;
  urlLabel: string;
  tagline: string;
  description: string[];
  stack: string[];
}

const projects: Project[] = [
  {
    title: "Fin",
    url: "https://fin.ai",
    urlLabel: "fin.ai",
    tagline: "Marketing site for Intercom's AI agent product",
    description: [
      "Next.js marketing site for Intercom's AI agent product, attracting 200k monthly visitors — high-velocity feature shipping with Claude Code and Conductor, experimentation with Eppo, Sanity for flexible content management, hosted and deployed on Vercel, with full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Conductor", "NextJS", "Vercel", "Tailwind", "Eppo", "Datadog", "Sentry", "Sanity"],
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

export function PanelProjects({ isActive }: { isActive?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (isActive) {
      const base = 200;
      const titleDone = base + Math.min(450, projects[0].title.length * 20);
      const taglineDone = base + 60 + Math.min(700, projects[0].tagline.length * 9);
      const timer = setTimeout(() => setSelected(0), Math.max(titleDone, taglineDone) + 50);
      return () => clearTimeout(timer);
    } else {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const timer = setTimeout(() => setSelected(null), isMobile ? 270 : 390);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="h-full flex flex-col p-8 md:p-16">
<div className="flex-1 overflow-y-auto">
        {projects.map((project, i) => {
          const isOpen = selected === i;
          const base = 200 + i * 50;

          return (
            <div key={project.title}>
              <button
                className="w-full flex items-start gap-6 py-4 text-left group cursor-pointer"
                onClick={() => setSelected(isOpen ? null : i)}
              >
                <div className="flex-1 min-w-0">
                  <span className={`text-sm transition-colors ${isOpen ? "text-foreground" : "text-muted group-hover:text-foreground"}`}>
                    <ScrambleText text={project.title} delay={base} duration={Math.min(450, project.title.length * 20)} />
                  </span>
                  <span className="hidden md:inline text-sm text-subtle ml-4 transition-colors group-hover:text-muted">
                    <ScrambleText text={project.tagline} delay={base + 60} duration={Math.min(700, project.tagline.length * 9)} wrap />
                  </span>
                </div>
                <span className={`text-foreground/50 text-xl leading-none flex-none transition-transform duration-300 ${isOpen ? "rotate-45" : "group-hover:text-foreground"}`}>
                  +
                </span>
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.21s ease",
                }}
              >
                <div className="overflow-hidden">
                  <div className="pb-8 space-y-4">
                    <p className="text-sm text-subtle md:hidden">{project.tagline}</p>
                    {project.description.map((p, j) => (
                      <p key={j} className="text-sm leading-relaxed text-muted max-w-2xl">
                        {p}
                      </p>
                    ))}
                    <p className="text-[10px] tracking-widest text-subtle uppercase">
                      {project.stack.join(" · ")}
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[10px] tracking-widest text-accent hover:text-foreground transition-colors uppercase"
                    >
                      {project.urlLabel} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
