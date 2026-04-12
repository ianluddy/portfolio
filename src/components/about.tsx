import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const timeline = [
  { date: "May 2025", endDate: "Present", role: "Senior Web Engineer", company: "Intercom", url: "http://www.intercom.com/", icon: "https://www.google.com/s2/favicons?domain=intercom.com&sz=64" },
  { date: "Dec 2019", endDate: "May 2025", role: "Senior Web Engineer", company: "Zendesk", url: "http://www.zendesk.com/", icon: "https://www.google.com/s2/favicons?domain=zendesk.com&sz=64" },
  { date: "Dec 2018", endDate: "Dec 2019", role: "Senior Full Stack Developer", company: "Total Digital", url: "http://www.totaldigital.ie/", icon: "https://www.google.com/s2/favicons?domain=totaldigital.ie&sz=64" },
  { date: "Jun 2016", endDate: "Dec 2018", role: "Senior Full Stack Developer", company: "Software Design", url: "http://www.softwaredesign.ie/", icon: "https://www.google.com/s2/favicons?domain=softwaredesign.ie&sz=64" },
  { date: "Jan 2016", endDate: "Jun 2016", role: "Senior Back End Developer", company: "Qualio", url: "http://www.qualio.com", icon: "https://www.google.com/s2/favicons?domain=qualio.com&sz=64" },
  { date: "Oct 2012", endDate: "Jan 2016", role: "Lead Developer", company: "Arts Alliance Media", url: "http://www.artsalliancemedia.com/", icon: "https://www.google.com/s2/favicons?domain=artsalliancemedia.com&sz=64" },
  { date: "Aug 2011", endDate: "Oct 2012", role: "Python Developer", company: "Arts Alliance Media", url: "http://www.artsalliancemedia.com/", icon: "https://www.google.com/s2/favicons?domain=artsalliancemedia.com&sz=64" },
  { date: "May 2011", endDate: "Aug 2011", role: "Back End Developer", company: "Avaeon", url: "http://www.avaeon.com/", icon: "https://www.google.com/s2/favicons?domain=avaeon.com&sz=64" },
  { date: "Sep 2008", endDate: "May 2011", role: "BSc. (Hons) Software Development", company: "ATU", url: "http://www.atu.ie", icon: "https://www.google.com/s2/favicons?domain=atu.ie&sz=64" },
];

export function About() {
  return (
    <section id="about" className="bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 md:pb-10">
        <h2 className="text-4xl md:text-5xl font-heading mb-10 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-base font-base leading-relaxed">
            <p>Hi there!</p>
            <p>
              I&apos;m a full-stack software builder from Galway with a passion for
              coding that started in 2008. I build software the way modern
              engineers should: AI-first. Using <a href="https://claude.ai/code" className="underline font-heading hover:text-main">Claude Code</a> as my primary
              engineering partner, I prototype, architect, and ship production
              systems dramatically faster than traditional workflows allow.
            </p>
            <p>
              I use AI to explore design tradeoffs, eliminate boilerplate,
              refactor safely, and maintain high velocity without sacrificing
              code quality. I use <a href="https://conductor.build" className="underline font-heading hover:text-main">Conductor</a> to maximise productivity by
              parallelising multiple AI agents across tasks, letting me ship
              features, fix bugs, and iterate on designs simultaneously.
            </p>
            <p>
              Outside of work I&apos;m usually chilling with the family, attempting
              latte art, playing some tunes on the banjo or walking the
              dachshund.
            </p>
            <p>Have a nice day! 🙂</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-3 border-b border-border/30 last:border-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.icon}
                      alt={item.company}
                      className="flex-shrink-0 rounded-sm w-8 h-8 object-contain self-center"
                    />
                    <div>
                      <a
                        href={item.url}
                        className="text-sm font-heading hover:text-main underline"
                      >
                        {item.company}
                      </a>
                      <div className="text-xs text-foreground/60">
                        {item.role} · {item.date} – {item.endDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
