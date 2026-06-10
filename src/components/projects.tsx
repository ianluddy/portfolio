"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type DeviceType = "laptop" | "phone" | "phone-tablet";

interface Project {
  title: string;
  url: string;
  urlLabel: string;
  description: string[];
  stack: string[];
  image: string;
  image2?: string;
  imageAlt: string;
  device: DeviceType;
}

const projects: Project[] = [
  {
    title: "Fin",
    url: "https://fin.ai",
    urlLabel: "fin.ai",
    description: [
      "The marketing site for Intercom's AI agent product — high-velocity feature shipping, experimentation with Eppo, Sanity for flexible content management, hosted and deployed on Vercel, with full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Conductor", "NextJS", "Vercel", "Tailwind", "Eppo", "Datadog", "Sentry", "Sanity"],
    image: "/image/fin.webp",
    imageAlt: "Fin",
    device: "laptop",
  },
  {
    title: "Intercom",
    url: "https://www.intercom.com",
    urlLabel: "intercom.com",
    description: [
      "The main marketing site for Intercom's customer service platform — high-velocity feature shipping, experimentation with Eppo, content management through Contentful, hosted and deployed on Vercel, with full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Conductor", "NextJS", "Vercel", "Tailwind", "Eppo", "Datadog", "Sentry", "Contentful"],
    image: "/image/intercom.webp",
    imageAlt: "Intercom",
    device: "laptop",
  },
  {
    title: "Zendesk",
    url: "https://www.zendesk.com",
    urlLabel: "zendesk.com",
    description: [
      "The marketing site for Zendesk's customer service and CRM platform, attracting around 2 million visitors each month across 16 localised languages, with experimentation and personalisation via Optimizely and full observability via Datadog and Sentry.",
    ],
    stack: ["Claude Code", "Cursor", "NextJS", "React", "Node", "Optimizely", "Adobe Target", "Storybook", "Hotjar", "AWS", "Docker"],
    image: "/image/zen.webp",
    imageAlt: "Zendesk",
    device: "laptop",
  },
  {
    title: "Dylan Luddy",
    url: "https://www.dylanluddy.com",
    urlLabel: "dylanluddy.com",
    description: [
      "A portfolio site for Dylan Luddy, a digital marketer based in London, showcasing his experience across SEO, paid media, and growth strategy — built with Next.js, Tailwind CSS, and Sanity CMS on Vercel.",
    ],
    stack: ["Claude Code", "Claude Design", "NextJS", "React", "Tailwind CSS", "Sanity CMS", "Vercel"],
    image: "/image/dylan.webp",
    imageAlt: "Dylan Luddy Portfolio",
    device: "laptop",
  },
  {
    title: "Screenwriter",
    url: "https://www.artsalliancemedia.com/",
    urlLabel: "artsalliancemedia.com",
    description: [
      "Arts Alliance Media's flagship product — a Theatre Management System running on over 40,000 digital screens globally. I led the team for three years on this Python application with a browser-based front end, integrating with all major projection and audio systems, POS systems, IP cameras, and other cinema hardware.",
    ],
    stack: ["Python", "MongoDB", "Bootstrap", "AWS", "Docker", "Flask", "Django", "SQLAlchemy", "Handlebars"],
    image: "/image/tms.webp",
    imageAlt: "Screenwriter",
    device: "laptop",
  },
  {
    title: "Ian & Claire",
    url: "https://ianandclaire.vercel.app/",
    urlLabel: "ianandclaire.com",
    description: [
      "A wedding website built with Next.js, Google Fonts, and imagery from Etsy, with Google Forms handling guest RSVPs.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Forms", "Etsy"],
    image: "/image/wed.webp",
    image2: "/image/wed1.webp",
    imageAlt: "Ian and Claire",
    device: "phone-tablet",
  },
  {
    title: "Enterprise Ireland",
    url: "https://www.enterprise-ireland.com/",
    urlLabel: "enterprise-ireland.com",
    description: [
      "A WordPress marketing site for Enterprise Ireland, designed to promote Ireland's export strengths and connect Irish businesses with international markets.",
    ],
    stack: ["PHP", "WordPress", "WPML", "WPEngine", "AWS", "Docker"],
    image: "/image/adv.webp",
    imageAlt: "Irish Advantage",
    device: "laptop",
  },
  {
    title: "Health Connect",
    url: "https://healthconnect.ie",
    urlLabel: "healthconnect.ie",
    description: [
      "Health Connect is a multilingual WordPress platform making healthcare services accessible to minority and vulnerable communities across Ireland, with WPML-powered support for Polish, Chinese, Russian, and Arabic, plus Google Maps integration for service locations.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "Fontawesome", "AWS", "Docker"],
    image: "/image/hc.webp",
    image2: "/image/hc1.webp",
    imageAlt: "Health Connect",
    device: "phone-tablet",
  },
  {
    title: "Baked Goodes",
    url: "https://bakedgoodes.vercel.app/",
    urlLabel: "bakedgoodes.ie",
    description: [
      "A fast, responsive Next.js site for a baking business, with Formik-powered order and inquiry forms and Sentry for error tracking.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Maps", "Sentry", "Formik", "Etsy"],
    image: "/image/baked.webp",
    image2: "/image/baked1.webp",
    imageAlt: "Baked Goodes",
    device: "phone-tablet",
  },
  {
    title: "Qualio",
    url: "https://www.qualio.com/",
    urlLabel: "qualio.com",
    description: [
      "SaaS Quality Management platform built on the Pyramid framework for organisations in regulated industries like Pharma and Life Sciences.",
    ],
    stack: ["Python", "Pyramid", "PostgreSQL", "Gunicorn", "Nginx", "CircleCI", "AWS", "Docker"],
    image: "/image/qual.webp",
    imageAlt: "Qualio",
    device: "laptop",
  },
  {
    title: "DPD - Manage Delivery",
    url: "https://dpd.ie/",
    urlLabel: "dpd.ie",
    description: [
      "A delivery management web app integrated with DPD's portal backend — now used by thousands of people every week.",
    ],
    stack: [".NET", "Microsoft IIS", "SQL Server", "Postman"],
    image: "/image/dpd.webp",
    image2: "/image/dpd1.webp",
    imageAlt: "DPD",
    device: "phone-tablet",
  },
  {
    title: "Weir & Sons",
    url: "https://weirandsons.ie",
    urlLabel: "weirandsons.ie",
    description: [
      "An eCommerce site for weirandsons.ie, a renowned Irish jewellery retailer, combining WordPress for the frontend with Magento for the backend.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Magento"],
    image: "/image/weir.webp",
    imageAlt: "Weir & Sons",
    device: "laptop",
  },
  {
    title: "Health Services Staffs Credit Union",
    url: "https://www.hsscu.ie/",
    urlLabel: "hsscu.ie",
    description: [
      "A modern WordPress platform for the Health Services Staffs Credit Union, covering online banking, loan calculators, and financial resources, with SEO and analytics setup.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Bootstrap", "Slick Slider", "AWS", "Docker"],
    image: "/image/hss.webp",
    imageAlt: "HSSCU",
    device: "laptop",
  },
  {
    title: "Member First Credit Union",
    url: "https://www.mfcu.ie",
    urlLabel: "mfcu.ie",
    description: [
      "A modern WordPress site for Member First Credit Union, with a custom loan calculator and AWS hosting for speed, scalability, and security.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "AWS", "Docker"],
    image: "/image/mfcu.webp",
    image2: "/image/mfcu1.webp",
    imageAlt: "Member First Credit Union",
    device: "phone-tablet",
  },
  {
    title: "Sparebace",
    url: "https://sparebace.vercel.app/",
    urlLabel: "sparebace.vercel.app",
    description: [
      "Built in response to a Barespace challenge — 'Transform the way salon bookings are made' — Sparebace is a voice-enabled chatbot booking experience built with Next.js 14, Prisma, PostgreSQL, and Stripe, deployed on Vercel with NeonDB for serverless database hosting.",
    ],
    stack: ["Claude Code", "Cursor", "Vercel", "NextJS", "React", "Prisma", "NeonDB", "PostgreSQL", "Stripe"],
    image: "/image/bare.webp",
    imageAlt: "Sparebace",
    device: "laptop",
  },
];

function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="laptop-device">
      <div className="laptop-lid">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
      <div className="laptop-base" />
    </div>
  );
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone-device">
      <div className="phone-notch" />
      <div className="phone-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function TabletMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tablet-device">
      <div className="tablet-camera" />
      <div className="tablet-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function DeviceMockup({ project }: { project: Project }) {
  if (project.device === "laptop") {
    return (
      <div className="flex items-end justify-center w-full">
        <LaptopMockup src={project.image} alt={project.imageAlt} />
      </div>
    );
  }

  return (
    <div className="flex items-end justify-center gap-4 md:gap-6">
      <PhoneMockup src={project.image2 || project.image} alt={project.imageAlt} />
      <TabletMockup src={project.image} alt={project.imageAlt} />
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <div className="py-12 md:py-16">
      <div className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-start md:min-h-[380px]`}>
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl md:text-3xl">{project.title}</h3>
          <a
            href={project.url}
            className="text-sm text-foreground/70 hover:text-foreground hover:underline font-base relative bottom-5"
          >
            {project.urlLabel}
          </a>
          <div className="space-y-3">
            {project.description.map((p, i) => (
              <p key={i} className="text-sm font-base leading-relaxed text-foreground/80">
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.stack.map((tech) => (
              <Badge key={tech} className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <DeviceMockup project={project} />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 7);

  return (
    <section id="projects" className="bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6 py-16 md:pt-10 md:pb-24">
        <h2 className="text-4xl md:text-5xl font-heading mb-4 text-center">Projects</h2>
        {visible.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
        {!showAll && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setShowAll(true)} className="text-base px-8 py-3">
              <ChevronDown className="mr-2 h-4 w-4" />
              Show All Projects ({projects.length - 7} more)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
