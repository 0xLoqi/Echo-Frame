import { Link } from "wouter";
import { Paintbrush, Instagram, Twitter, Facebook, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-bold text-white mb-4 block">
              <Paintbrush className="inline-block mr-2 h-5 w-5" />ArtifyAI
            </span>
            <p className="text-sm text-neutral-400 mb-4">
              Using the power of AI to transform your ideas into beautiful custom
              artwork.
            </p>
            <div className="flex space-x-4">
              <button
                className="text-neutral-400 hover:text-white transition"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                className="text-neutral-400 hover:text-white transition"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                className="text-neutral-400 hover:text-white transition"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                className="text-neutral-400 hover:text-white transition"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create">
                  <div className="cursor-pointer hover:text-white transition">Create Art</div>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <div className="cursor-pointer hover:text-white transition">Gallery</div>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works">
                  <div className="cursor-pointer hover:text-white transition">How It Works</div>
                </Link>
              </li>
              <li>
                <Link href="/#pricing">
                  <div className="cursor-pointer hover:text-white transition">Pricing</div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button className="hover:text-white transition">
                  FAQ
                </button>
              </li>
              <li>
                <button className="hover:text-white transition">
                  Shipping
                </button>
              </li>
              <li>
                <button className="hover:text-white transition">
                  Returns
                </button>
              </li>
              <li>
                <button className="hover:text-white transition">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Newsletter</h3>
            <p className="text-sm text-neutral-400 mb-4">
              Get inspired with our weekly art digest and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2 bg-neutral-700 rounded-l-md border-none focus:outline-none text-white text-sm"
              />
              <button className="px-3 py-2 bg-primary hover:bg-opacity-90 text-white rounded-r-md text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-sm text-neutral-500 flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} ArtifyAI. All rights reserved.</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="hover:text-neutral-300">
              Privacy Policy
            </button>
            <button className="hover:text-neutral-300">
              Terms of Service
            </button>
            <button className="hover:text-neutral-300">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
