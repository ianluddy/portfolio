import Marquee from "@/components/ui/marquee";

const skills = [
  "NextJS",
  "React",
  "Python",
  "TypeScript",
  "Node.js",
  "AWS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "A/B Testing",
  "Design Systems",
  "Agile",
  "Flask",
  "Django",
  "WordPress",
];

export function SkillsMarquee() {
  return <Marquee items={skills} />;
}
