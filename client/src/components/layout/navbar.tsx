import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";

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
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center">
          <div className="flex space-x-8 text-neutral-800 font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition hover:text-primary ${
                  location === link.href ? "text-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 pt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`block px-2 py-1 text-lg transition hover:text-primary ${
                        location === link.href ? "text-primary" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
