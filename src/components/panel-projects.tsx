"use client";

import { useState } from "react";

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
    title: "Dylan Luddy",
    url: "https://www.dylanluddy.com",
    urlLabel: "dylanluddy.com",
    tagline: "Portfolio site for a digital marketer in London",
    description: [
      "I built a portfolio website for my brother Dylan, a digital marketer based in London. The site showcases his experience across SEO, paid media, and growth strategy, with a clean, modern aesthetic to match his personal brand.",
      "Built with Next.js and Tailwind CSS, with content managed through Sanity CMS. Hosted on Vercel and built entirely using Claude Code and Claude Design.",
    ],
    stack: ["Claude Code", "Claude Design", "NextJS", "React", "Tailwind CSS", "Sanity CMS", "Vercel"],
  },
  {
    title: "Zendesk",
    url: "https://www.zendesk.com",
    urlLabel: "zendesk.com",
    tagline: "Led 400+ A/B experiments across 2M monthly visitors",
    description: [
      "I led the experimentation program at Zendesk, strategically implementing A/B tests and personalisation campaigns across marketing sites attracting around 2 million visitors each month.",
      "Also collaborated with product and design teams to build out new website sections and add components to the design system, plus out-of-hours support for internal stakeholders.",
    ],
    stack: ["Claude Code", "Cursor", "NextJS", "React", "Node", "Optimizely", "Adobe Target", "Storybook", "Hotjar", "AWS", "Docker"],
  },
  {
    title: "Sparebace",
    url: "https://sparebace.vercel.app/",
    urlLabel: "sparebace.vercel.app",
    tagline: "Voice-enabled salon booking app",
    description: [
      "Built in response to a challenge by Barespace: 'Transform the way salon bookings are made.' Users interact with a voice-enabled chatbot to schedule appointments in a natural, hands-free way.",
      "Built with Next.js 14, Prisma, and PostgreSQL, with Stripe integration for secure payments. Deployed on Vercel with NeonDB for serverless database hosting.",
    ],
    stack: ["Claude Code", "Cursor", "Vercel", "NextJS", "React", "Prisma", "NeonDB", "PostgreSQL", "Stripe"],
  },
  {
    title: "Screenwriter",
    url: "https://www.artsalliancemedia.com/",
    urlLabel: "artsalliancemedia.com",
    tagline: "Theatre Management System running on 40,000+ cinema screens",
    description: [
      "Arts Alliance Media's flagship product — a Theatre Management System built for digital cinema operators. I led the team on this project for three years.",
      "A Python application with browser-based front end, integrating with all major projection and audio systems, POS systems, IP cameras, and other hardware.",
    ],
    stack: ["Python", "MongoDB", "Bootstrap", "AWS", "Docker", "Flask", "Django", "SQLAlchemy", "Handlebars"],
  },
  {
    title: "Ian & Claire",
    url: "https://ianandclaire.vercel.app/",
    urlLabel: "ianandclaire.com",
    tagline: "Wedding website with Google Forms RSVP",
    description: [
      "A wedding website I created for my wife and our big day, using Next.js with Google Fonts and imagery from Etsy.",
      "Google Forms integration for collecting guest RSVPs — simple, effective, and a great excuse to go deeper with Next.js.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Forms", "Etsy"],
  },
  {
    title: "Enterprise Ireland",
    url: "https://www.irishadvantage.com",
    urlLabel: "irishadvantage.com",
    tagline: "Multilingual WordPress site in 6 languages",
    description: [
      "Built irishadvantage.com for Enterprise Ireland to help promote Ireland's export strengths and connect Irish businesses with global markets.",
      "A localised WordPress website with country-specific domains in six languages, built at Total Digital.",
    ],
    stack: ["PHP", "WordPress", "WPML", "WPEngine", "AWS", "Docker"],
  },
  {
    title: "HealthConnect",
    url: "https://healthconnect.ie",
    urlLabel: "healthconnect.ie",
    tagline: "Healthcare access platform for minority communities in Ireland",
    description: [
      "A multilingual platform making healthcare services accessible to minority and vulnerable communities across Ireland.",
      "Multilingual support for Polish, Chinese, Russian, and Arabic via WPML, plus Google Maps integration for service locations.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "Fontawesome", "AWS", "Docker"],
  },
  {
    title: "BakedGoodes",
    url: "https://bakedgoodes.vercel.app/",
    urlLabel: "bakedgoodes.ie",
    tagline: "E-commerce site for my wife's baking business",
    description: [
      "A fast, responsive Next.js platform showcasing products with Formik-powered order and inquiry forms.",
      "Integrated Sentry for error tracking to keep everything running smoothly.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Maps", "Sentry", "Formik", "Etsy"],
  },
  {
    title: "Qualio",
    url: "https://www.qualio.com/",
    urlLabel: "qualio.com",
    tagline: "SaaS Quality Management for pharma and life sciences",
    description: [
      "Primary backend Python developer for Qualio's SaaS Quality Management software, built on the Pyramid framework for organisations in regulated industries.",
      "Took on refactoring legacy code, developing a new API, and creating new features to enhance the user experience.",
    ],
    stack: ["Python", "Pyramid", "PostgreSQL", "Gunicorn", "Nginx", "CircleCI", "AWS", "Docker"],
  },
  {
    title: "DPD — Manage Delivery",
    url: "https://dpd.ie/",
    urlLabel: "dpd.ie",
    tagline: "Delivery management portal used by thousands weekly",
    description: [
      "Built the front end of DPD's delivery management web app, integrating with their portal backend. Heavy QA and back-and-forth with DPD's tech team.",
    ],
    stack: [".NET", "Microsoft IIS", "SQL Server", "Postman"],
  },
  {
    title: "SliceScanner",
    url: "https://github.com/ianluddy/slice_scanner",
    urlLabel: "slicescanner.com",
    tagline: "Pizza aggregator — all the best slices in one place",
    description: [
      "A web app that pulls data from top pizza vendors around the country and presents it in one place for pizza lovers.",
      "Built with Flask behind Tornado, Bootstrap UI, Selenium for web scraping, hosted on AWS.",
    ],
    stack: ["Python", "MongoDB", "Bootstrap", "AWS", "Tornado", "Selenium", "Fontawesome"],
  },
  {
    title: "HSSCU",
    url: "https://www.hsscu.ie/",
    urlLabel: "hsscu.ie",
    tagline: "WordPress site for Health Services Staffs Credit Union",
    description: [
      "A modern, easy-to-use platform where members can access online banking, loan calculators, and financial resources.",
      "Customised plugins and features in close collaboration with agency and HSSCU stakeholders, with SEO and analytics setup.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Bootstrap", "Slick Slider", "AWS", "Docker"],
  },
  {
    title: "Member First Credit Union",
    url: "https://www.mfcu.ie",
    urlLabel: "mfcu.ie",
    tagline: "Custom WordPress theme with loan calculator",
    description: [
      "A WordPress project for a credit union client at Total Digital — custom Bootstrap theme with a custom-built loan calculator.",
      "Hosted on AWS for speed, scalability, and security.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "AWS", "Docker"],
  },
  {
    title: "Weir & Sons",
    url: "https://weirandsons.ie",
    urlLabel: "weirandsons.ie",
    tagline: "eCommerce for a renowned Irish jeweller",
    description: [
      "Part of a team that developed an eCommerce site combining WordPress for the frontend with Magento for the backend.",
      "Contributed custom features, performance optimisation, and cross-device compatibility.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Magento"],
  },
];

export function PanelProjects() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col p-8 md:p-16">
      <p className="text-[10px] tracking-[0.2em] text-subtle uppercase mb-8 flex-none">
        Projects — {projects.length} total
      </p>

      <div className="flex-1 overflow-y-auto">
        {projects.map((project, i) => {
          const isOpen = selected === i;
          const num = String(i + 1).padStart(2, "0");

          return (
            <div key={project.title} className="border-t border-foreground/10">
              <button
                className="w-full flex items-start gap-6 py-4 text-left group cursor-pointer"
                onClick={() => setSelected(isOpen ? null : i)}
              >
                <span className="text-[10px] text-subtle tracking-widest mt-0.5 flex-none w-6">
                  {num}
                </span>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm transition-colors ${isOpen ? "text-foreground" : "text-muted group-hover:text-foreground"}`}>
                    {project.title}
                  </span>
                  <span className="hidden md:inline text-sm text-subtle ml-4">
                    {project.tagline}
                  </span>
                </div>
                <span className={`text-subtle text-sm flex-none transition-transform ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.35s ease",
                }}
              >
                <div className="overflow-hidden">
                  <div className="pl-12 pb-8 space-y-4">
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
                      className="inline-block text-[10px] tracking-widest text-muted hover:text-foreground transition-colors uppercase"
                    >
                      {project.urlLabel} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t border-foreground/10" />
      </div>
    </div>
  );
}
