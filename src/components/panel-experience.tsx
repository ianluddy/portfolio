const timeline = [
  { date: "May 2026", endDate: "Present", role: "Senior Web Engineer", company: "Fin", url: "https://fin.ai/" },
  { date: "May 2025", endDate: "May 2026", role: "Senior Web Engineer", company: "Intercom", url: "http://www.intercom.com/" },
  { date: "Dec 2019", endDate: "May 2025", role: "Senior Web Engineer", company: "Zendesk", url: "http://www.zendesk.com/" },
  { date: "Dec 2018", endDate: "Dec 2019", role: "Senior Full Stack Developer", company: "Total Digital", url: "http://www.totaldigital.ie/" },
  { date: "Jun 2016", endDate: "Dec 2018", role: "Senior Full Stack Developer", company: "Software Design", url: "http://www.softwaredesign.ie/" },
  { date: "Jan 2016", endDate: "Jun 2016", role: "Senior Back End Developer", company: "Qualio", url: "http://www.qualio.com" },
  { date: "Oct 2012", endDate: "Jan 2016", role: "Lead Developer", company: "Arts Alliance Media", url: "http://www.artsalliancemedia.com/" },
  { date: "Aug 2011", endDate: "Oct 2012", role: "Python Developer", company: "Arts Alliance Media", url: "http://www.artsalliancemedia.com/" },
  { date: "May 2011", endDate: "Aug 2011", role: "Back End Developer", company: "Avaeon", url: "http://www.avaeon.com/" },
  { date: "Sep 2008", endDate: "May 2011", role: "BSc. (Hons) Software Development", company: "ATU", url: "http://www.atu.ie" },
];

export function PanelExperience() {
  return (
    <div className="h-full flex flex-col p-8 md:p-16">
      <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-8 flex-none">
        Experience
      </p>

      <div className="flex-1 overflow-y-auto">
        {timeline.map((item, i) => (
          <div key={i} className="border-t border-white/10 py-5 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-0">
            <div className="md:w-48 flex-none">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-white/80 hover:text-white transition-colors"
              >
                {item.company}
              </a>
            </div>
            <div className="flex-1 text-sm font-light text-white/50">
              {item.role}
            </div>
            <div className="md:w-48 flex-none text-right">
              <span className="text-[10px] tracking-widest text-white/25 uppercase">
                {item.date} – {item.endDate}
              </span>
            </div>
          </div>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </div>
  );
}
