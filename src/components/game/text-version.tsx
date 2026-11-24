import { about, profile, projects, timeline } from "@/data/content";
import { RichText } from "./rich-text";

/** The whole portfolio as plain HTML, for screen readers and search engines. */
export function TextVersion() {
  return (
    <div className="sr-only">
      <h1>{profile.name}</h1>
      <p>{profile.tagline}</p>
      <p>
        {profile.location}. {profile.availability}.
      </p>

      <h2>About</h2>
      {about.map((p, i) => (
        <p key={i}>
          <RichText paragraph={p} />
        </p>
      ))}

      <h2>Experience</h2>
      <ul>
        {timeline.map((job, i) => (
          <li key={i}>
            <h3>
              {job.role} — <a href={job.url}>{job.company}</a>
            </h3>
            <p>
              {job.date} – {job.endDate}
            </p>
            {job.description && <p>{job.description}</p>}
          </li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.title}>
            <h3>
              <a href={p.url}>{p.title}</a>
            </h3>
            <p>{p.tagline}</p>
            {p.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
            <p>Stack: {p.stack.join(", ")}</p>
          </li>
        ))}
      </ul>

      <h2>Contact</h2>
      <ul>
        {profile.links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
