import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="bg-secondary-background min-h-[100dvh] flex items-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.07] select-none pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='280'%3E%3Ctext fill='%23000' font-family='monospace' font-size='10'%3E%3Ctspan x='2' y='12'%3E01101001%3C/tspan%3E%3Ctspan x='2' y='26'%3E10010110%3C/tspan%3E%3Ctspan x='2' y='40'%3E01001011%3C/tspan%3E%3Ctspan x='2' y='54'%3E11010010%3C/tspan%3E%3Ctspan x='2' y='68'%3E00101101%3C/tspan%3E%3Ctspan x='2' y='82'%3E10110100%3C/tspan%3E%3Ctspan x='2' y='96'%3E01011010%3C/tspan%3E%3Ctspan x='2' y='110'%3E11001001%3C/tspan%3E%3Ctspan x='2' y='124'%3E00110110%3C/tspan%3E%3Ctspan x='2' y='138'%3E10100101%3C/tspan%3E%3Ctspan x='2' y='152'%3E01101010%3C/tspan%3E%3Ctspan x='2' y='166'%3E10010011%3C/tspan%3E%3Ctspan x='2' y='180'%3E01100101%3C/tspan%3E%3Ctspan x='2' y='194'%3E11011010%3C/tspan%3E%3Ctspan x='2' y='208'%3E00101001%3C/tspan%3E%3Ctspan x='2' y='222'%3E10110110%3C/tspan%3E%3Ctspan x='2' y='236'%3E01001101%3C/tspan%3E%3Ctspan x='2' y='250'%3E11010100%3C/tspan%3E%3Ctspan x='2' y='264'%3E00110011%3C/tspan%3E%3Ctspan x='2' y='278'%3E10101010%3C/tspan%3E%3Ctspan x='72' y='12'%3E10110%3C/tspan%3E%3Ctspan x='72' y='26'%3E01001%3C/tspan%3E%3Ctspan x='72' y='40'%3E10110%3C/tspan%3E%3Ctspan x='72' y='54'%3E01101%3C/tspan%3E%3Ctspan x='72' y='68'%3E11010%3C/tspan%3E%3Ctspan x='72' y='82'%3E00101%3C/tspan%3E%3Ctspan x='72' y='96'%3E10011%3C/tspan%3E%3Ctspan x='72' y='110'%3E01110%3C/tspan%3E%3Ctspan x='72' y='124'%3E11001%3C/tspan%3E%3Ctspan x='72' y='138'%3E00110%3C/tspan%3E%3Ctspan x='72' y='152'%3E10101%3C/tspan%3E%3Ctspan x='72' y='166'%3E01010%3C/tspan%3E%3Ctspan x='72' y='180'%3E11100%3C/tspan%3E%3Ctspan x='72' y='194'%3E00011%3C/tspan%3E%3Ctspan x='72' y='208'%3E10100%3C/tspan%3E%3Ctspan x='72' y='222'%3E01011%3C/tspan%3E%3Ctspan x='72' y='236'%3E11010%3C/tspan%3E%3Ctspan x='72' y='250'%3E00101%3C/tspan%3E%3Ctspan x='72' y='264'%3E10010%3C/tspan%3E%3Ctspan x='72' y='278'%3E01101%3C/tspan%3E%3C/text%3E%3C/svg%3E")`,
        }}
      />
      <div className="mx-auto max-w-7xl px-6 w-full relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="hero-fade-in hero-fade-in-1">
            <h1 className="text-[66px] xs:text-[80px] sm:text-[90px] md:text-[120px] lg:text-[150px] xl:text-[170px] font-heading-shade leading-none">
              Ian Luddy
            </h1>
          </div>
          <div className="hero-fade-in hero-fade-in-2">
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] font-base text-foreground/80">
              One engineer · Many agents · Parallel workflows · Shipping at full velocity
            </p>
          </div>
          <div className="hero-fade-in hero-fade-in-3">
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
      </div>
    </section>
  );
}
