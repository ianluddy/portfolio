"use client";

import { useState } from "react";
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

  return (
    <nav className="sticky top-0 z-50 bg-secondary-background">
      <div className="flex items-stretch py-2">
        <div className="hidden md:flex items-center gap-1 px-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-base hover:bg-main hover:text-main-foreground rounded-base transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 ml-auto">
          <a href="mailto:ianluddy@gmail.com" aria-label="Email">
            <Button size="sm" variant="noShadow" className="p-2">
              <Mail className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://github.com/ianluddy" aria-label="GitHub">
            <Button size="sm" variant="noShadow" className="p-2">
              <GithubIcon className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://ie.linkedin.com/in/ianluddy" aria-label="LinkedIn">
            <Button size="sm" variant="noShadow" className="p-2">
              <LinkedinIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <button
          className="md:hidden ml-auto flex items-center px-4 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
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
