const timeline = [
  {
    date: "May 2025",
    endDate: "Present",
    role: "Senior Web Engineer",
    company: "Fin (formerly Intercom)",
    url: "https://fin.ai/",
    description: "Building out high-performance experiences across both Intercom — the best-in-class customer service platform — and its major AI pivot to Fin, an AI agent product that now powers millions of customer interactions. Work spans CMS integration, localisation systems for global markets, full-stack observability tooling, on-call incident response, high-velocity feature shipping, and creating and maintaining Claude skills to maximise engineering workflow efficiency. The Fin pivot was capped by Salesforce's $3.6B acquisition of the company.",
  },
  {
    date: "Dec 2019",
    endDate: "May 2025",
    role: "Senior Web Engineer",
    company: "Zendesk",
    url: "http://www.zendesk.com/",
    description: "Led the experimentation program across marketing sites attracting ~2M visitors monthly, running 400+ A/B tests and personalisation campaigns. Collaborated with product and design on new site sections and design system components, with lead responsibilities across engineering teams in EMEA and APAC.",
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
    role: "BSc. (Hons) Software Development — First-Class Honours",
    company: "ATU",
    url: "http://www.atu.ie",
    description: null,
  },
];

import { ScrambleText } from "@/components/scramble-text";
import { ScrambleParagraph } from "@/components/scramble-paragraph";

export function PanelExperience() {
  return (
    <div className="h-full flex flex-col p-8 md:p-16">
      <div className="flex-1 overflow-y-auto">
        {timeline.map((item, i) => {
          const base = 200 + i * 80;
          return (
            <div key={i} className="py-1.5 md:py-4 flex flex-col gap-1">
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-0">
                <div className="md:w-56 flex-none">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:text-foreground transition-colors"
                  >
                    <ScrambleText text={item.company} delay={base} duration={250} />
                  </a>
                </div>
                <div className="flex-1 text-sm text-muted">
                  <ScrambleText text={item.role} delay={base + 50} duration={Math.min(600, item.role.length * 9)} />
                </div>
                <div className="hidden md:block md:w-48 flex-none text-right">
                  <span className="text-[10px] tracking-widest text-subtle uppercase">
                    <ScrambleText text={`${item.date} – ${item.endDate}`} delay={base + 100} duration={350} />
                  </span>
                </div>
              </div>
              {item.description && (
                <div className="md:pl-56 pt-2 pb-1">
                  <ScrambleParagraph
                    text={item.description}
                    delay={base + 150}
                    duration={Math.min(1500, item.description.length * 7)}
                    className="text-sm leading-relaxed text-subtle max-w-2xl"
                  >
                    {item.description}
                  </ScrambleParagraph>
                </div>
              )}
              <div className="md:hidden pb-2">
                <span className="text-[10px] tracking-widest text-subtle uppercase">
                  <ScrambleText text={`${item.date} – ${item.endDate}`} delay={base + 100} duration={700} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
