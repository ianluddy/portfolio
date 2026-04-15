"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        setScrolled(window.scrollY > hero.offsetHeight - 60);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-secondary-background" : "bg-transparent"}`}>
      <div className="flex items-stretch py-2">
        <div className="hidden md:flex items-center gap-1 px-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm md:text-lg md:px-4 md:py-3 font-base hover:bg-main hover:text-main-foreground rounded-base transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 ml-auto">
          <a href="mailto:ianluddy@gmail.com" aria-label="Email">
            <Button size="sm" variant="noShadow" className="p-2 md:p-3">
              <Mail className="h-4 w-4 md:h-6 md:w-6" />
            </Button>
          </a>
          <a href="https://github.com/ianluddy" aria-label="GitHub">
            <Button size="sm" variant="noShadow" className="p-2 md:p-3">
              <GithubIcon className="h-4 w-4 md:h-6 md:w-6" />
            </Button>
          </a>
          <a href="https://ie.linkedin.com/in/ianluddy" aria-label="LinkedIn">
            <Button size="sm" variant="noShadow" className="p-2 md:p-3">
              <LinkedinIcon className="h-4 w-4 md:h-6 md:w-6" />
            </Button>
          </a>
        </div>

        <button
          className="md:hidden ml-auto flex items-center px-4 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t-2 border-border">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-5 py-3 text-sm font-base border-b border-border/30 hover:bg-main hover:text-main-foreground cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
