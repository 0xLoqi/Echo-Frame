import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-bold text-white mb-4 block">
              <i className="fas fa-paint-brush mr-2"></i>ArtifyAI
            </span>
            <p className="text-sm text-neutral-400 mb-4">
              Using the power of AI to transform your ideas into beautiful custom
              artwork.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition"
              >
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create">
                  <a className="hover:text-white transition">Create Art</a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="hover:text-white transition">Gallery</a>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works">
                  <a className="hover:text-white transition">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/#pricing">
                  <a className="hover:text-white transition">Pricing</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
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
            <a href="#" className="hover:text-neutral-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-neutral-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
