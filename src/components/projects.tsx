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
    title: "Zendesk",
    url: "https://www.zendesk.com",
    urlLabel: "zendesk.com",
    description: [
      "I was thrilled to lead the experimentation program at Zendesk, where I strategically implemented A/B tests and personalisation campaigns across our marketing sites, which collectively attracted around 2 million visitors each month. During my time at Zendesk, I successfully conducted over 400 experiments.",
      "In addition to web experimentation, I collaborated with product and design teams to build out and enhance new sections of our websites and add components to our design system. I also provided out-of-hours support and handled tickets for internal stakeholders.",
    ],
    stack: ["Claude Code", "Cursor", "NextJS", "React", "Node", "Optimizely", "Adobe Target", "Storybook", "Hotjar", "AWS", "Docker"],
    image: "/image/zen.webp",
    imageAlt: "Zendesk",
    device: "laptop",
  },
  {
    title: "Sparebace",
    url: "https://sparebace.vercel.app/",
    urlLabel: "sparebace.vercel.app",
    description: [
      "This project was built in response to a challenge set by Barespace: 'Transform the way salon bookings are made.' Sparebace is a reimagined salon booking experience where users interact with a voice-enabled chatbot to schedule appointments in a more natural, hands-free way.",
      "Under the hood, Sparebace is built with Next.js 14, Prisma, and PostgreSQL, with Stripe integration for secure payments. It's deployed on Vercel and uses NeonDB for serverless database hosting.",
    ],
    stack: ["Claude Code", "Cursor", "Vercel", "NextJS", "React", "Prisma", "NeonDB", "PostgreSQL", "Stripe"],
    image: "/image/bare.webp",
    imageAlt: "Sparebace",
    device: "laptop",
  },
  {
    title: "Screenwriter",
    url: "https://www.artsalliancemedia.com/",
    urlLabel: "artsalliancemedia.com",
    description: [
      "Arts Alliance Media (AAM) is a leader in digital cinema software and services, with its tech running on over 40,000 digital screens across the globe. Their flagship product, Screenwriter, is a Theatre Management System (TMS) built to make running a movie theatre easier.",
      "I led the team on this project for three years. Screenwriter is a Python application with a browser-based front end installed on Linux or Windows servers onsite in a movie theatre. We integrated with all of the major projection and audio systems, POS systems, IP cameras, and other hardware.",
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
      "I created a wedding website for my wife and our big day, using NextJS to bring it all together. I added a touch of style with Google Fonts and some beautiful imagery and font icons I found on Etsy.",
      "For the RSVP section, I integrated Google Forms to collect all the guest details, which made the process super simple. Not only was this a great way to dive deeper into NextJS, but it also saved me a bit of money!",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Forms", "Etsy"],
    image: "/image/wed.webp",
    image2: "/image/wed1.webp",
    imageAlt: "Ian and Claire",
    device: "phone-tablet",
  },
  {
    title: "Enterprise Ireland",
    url: "https://www.irishadvantage.com",
    urlLabel: "irishadvantage.com",
    description: [
      "During my time at Total Digital, I worked on building irishadvantage.com for Enterprise Ireland to help promote Ireland's export strengths and connect Irish businesses with global markets.",
      "The site, a localised Wordpress website with country-specific domains in six languages, highlights the unique advantages Irish companies bring across industries.",
    ],
    stack: ["PHP", "WordPress", "WPML", "WPEngine", "AWS", "Docker"],
    image: "/image/adv.webp",
    imageAlt: "Irish Advantage",
    device: "laptop",
  },
  {
    title: "HealthConnect",
    url: "https://healthconnect.ie",
    urlLabel: "healthconnect.ie",
    description: [
      "HealthConnect is a multilingual platform created to make healthcare services more accessible to minority and vulnerable communities across Ireland.",
      "The platform offers detailed info on a wide range of health services. I used the WPML plugin to build multilingual support, covering Polish, Chinese, Russian, and Arabic. I also integrated Google Maps for user-friendly map views.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "Fontawesome", "AWS", "Docker"],
    image: "/image/hc.webp",
    image2: "/image/hc1.webp",
    imageAlt: "HealthConnect",
    device: "phone-tablet",
  },
  {
    title: "BakedGoodes",
    url: "https://github.com/ianluddy/bakedgoodes/",
    urlLabel: "bakedgoodes.ie",
    description: [
      "I created a website for my wife's baking business, BakedGoodes, using Next.js to make a fast, responsive platform that showcases her amazing treats.",
      "To simplify orders and inquiries, I built reliable forms with Formik. I also integrated Sentry for error tracking to keep everything running smoothly.",
    ],
    stack: ["NextJS", "React", "Google Fonts", "Google Maps", "Sentry", "Formik", "Etsy"],
    image: "/image/baked.webp",
    image2: "/image/baked1.webp",
    imageAlt: "BakedGoodes",
    device: "phone-tablet",
  },
  {
    title: "Qualio",
    url: "https://www.qualio.com/",
    urlLabel: "qualio.com",
    description: [
      "I worked at Qualio as the primary backend Python developer for the company's SaaS Quality Management software. This application, built on the robust Pyramid framework, is designed for organizations in highly regulated industries such as Pharma and Life Sciences.",
      "During my time at Qualio, I took on refactoring legacy code, developing a new API, and creating innovative features to enhance the user experience.",
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
      "For DPD, I worked on building the front end of a web app that hooks into their delivery management portal. It was a tricky but rewarding project involving a lot of QA and back-and-forth with DPD's tech team.",
      "One of the best parts was seeing the app go live and knowing it's being used by thousands of people every week. I use this app myself regularly for those crucial coffee deliveries.",
    ],
    stack: [".NET", "Microsoft IIS", "SQL Server", "Postman"],
    image: "/image/dpd.webp",
    image2: "/image/dpd1.webp",
    imageAlt: "DPD",
    device: "phone-tablet",
  },
  {
    title: "SliceScanner",
    url: "https://github.com/ianluddy/slice_scanner",
    urlLabel: "slicescanner.com",
    description: [
      "SliceScanner is a web app that pulls in data from the top pizza vendors around the country and presents it all in one place for pizza lovers who want to know where to get the best slice.",
      "I built the UI using Bootstrap, with a Flask app running behind Tornado. I used Selenium for web scraping, and hosted everything on AWS.",
    ],
    stack: ["Python", "MongoDB", "Bootstrap", "AWS", "Tornado", "Selenium", "Fontawesome"],
    image: "/image/slice.webp",
    imageAlt: "SliceScanner",
    device: "laptop",
  },
  {
    title: "HSSCU",
    url: "https://www.hsscu.ie/",
    urlLabel: "hsscu.ie",
    description: [
      "I worked on a WordPress project to create a website for the Health Services Staffs Credit Union (HSSCU). The goal was to build a modern, easy-to-use platform where members could access online banking, loan calculators, and financial resources.",
      "I worked closely with the agency and HSSCU stakeholders to customise plugins and add features. I also focused on SEO and set up analytics tools to track user engagement.",
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
      "At Total Digital, I worked on mfcu.ie, a WordPress project for one of our credit union clients. We built a custom WordPress theme using Bootstrap, ensuring a responsive and user-friendly design.",
      "One of my key contributions was developing a loan calculator. For hosting and security, we used AWS, ensuring the site was fast, scalable, and secure.",
    ],
    stack: ["PHP", "WordPress", "Bootstrap", "AWS", "Docker"],
    image: "/image/mfcu.webp",
    image2: "/image/mfcu1.webp",
    imageAlt: "Member First Credit Union",
    device: "phone-tablet",
  },
  {
    title: "Weir & Sons",
    url: "https://weirandsons.ie",
    urlLabel: "weirandsons.ie",
    description: [
      "I was part of a team that developed an eCommerce site for weirandsons.ie, a renowned jewelry retailer. The project involved combining WordPress for the frontend with Magento for the backend.",
      "My contributions included integrating custom features, optimising site performance, and ensuring compatibility across devices.",
    ],
    stack: ["PHP", "WordPress", "WPEngine", "Magento"],
    image: "/image/weir.webp",
    imageAlt: "Weir & Sons",
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
      <div className="flex items-end justify-center">
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
