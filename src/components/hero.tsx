import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="bg-secondary-background min-h-[100dvh] flex items-center"
    >
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-[67px] md:text-[120px] font-heading-shade leading-tight">
            Ian Luddy
          </h1>
          <p className="text-xl md:text-xl font-base text-foreground/80">
            One engineer · Many agents · Parallel workflows · Shipping at full velocity
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="#projects" className="w-full sm:w-auto">
              <Button className="text-base px-6 py-3 w-full sm:w-auto">
                <ArrowDown className="mr-2 h-4 w-4" />
                View Projects
              </Button>
            </a>
            <a href="https://github.com/ianluddy" className="w-full sm:w-auto">
              <Button className="text-base px-6 py-3 bg-secondary w-full sm:w-auto">
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href="https://ie.linkedin.com/in/ianluddy" className="w-full sm:w-auto">
              <Button className="text-base px-6 py-3 bg-secondary w-full sm:w-auto">
                <LinkedinIcon className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
