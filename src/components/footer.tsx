import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h2 className="text-2xl font-heading mb-2">Get in touch</h2>
            <p className="text-sm font-base text-foreground/60">
              Always happy to hear from you.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="mailto:ianluddy@gmail.com">
              <Button className="px-5 py-3">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </a>
            <a href="https://github.com/ianluddy">
              <Button className="px-5 py-3">
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href="https://ie.linkedin.com/in/ianluddy">
              <Button className="px-5 py-3">
                <LinkedinIcon className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-foreground/40 font-base">
          &copy; Ian Luddy {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
