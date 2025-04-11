import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/create", label: "Create" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      } backdrop-blur-md bg-background/80`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FF6B6B] flex items-center">
              <i className="fas fa-paint-brush mr-2"></i>ArtifyAI
            </a>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 text-neutral-800 font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`transition hover:text-primary ${
                  location === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:flex">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
            Get Started
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden text-neutral-800"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a
                      className={`text-lg py-2 transition hover:text-primary ${
                        location === link.href ? "text-primary font-medium" : ""
                      }`}
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Button className="w-full">Sign In</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
