import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/booking', label: 'Book a Slot' },
    { href: '/admin', label: 'Admin' },
  ];

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-turf-dark text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-sm bg-gold flex items-center justify-center shadow-gold">
                <Leaf className="w-5 h-5 text-turf-dark" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg font-bold tracking-wide text-white">
                  GREEN PITCH
                </span>
                <span className="font-heading text-xs font-medium tracking-widest text-gold">
                  TURF
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 font-heading text-sm font-medium tracking-wide transition-all duration-200 rounded-sm ${
                    isActive(link.href)
                      ? 'bg-gold text-turf-dark'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-turf-dark border-t border-white/10 animate-fade-in">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 font-heading text-sm font-medium tracking-wide rounded-sm transition-all ${
                    isActive(link.href)
                      ? 'bg-gold text-turf-dark'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-turf-dark text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-turf-dark" />
                </div>
                <span className="font-heading text-lg font-bold tracking-wide">
                  GREEN PITCH TURF
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium cricket turf facility offering world-class playing experience for cricket enthusiasts.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-gold font-semibold tracking-wide mb-4 text-sm uppercase">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-gold text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-gold font-semibold tracking-wide mb-4 text-sm uppercase">
                Contact Us
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>📍 Pillikothi, In Front of Roadways Bus Stand, Near Froth N Fables</li>
                <li>
                  📞{' '}
                  <a href="tel:7233818191" className="hover:text-gold transition-colors">
                    +91 72338 18191
                  </a>
                </li>
                <li>
                  📞{' '}
                  <a href="tel:9044430809" className="hover:text-gold transition-colors">
                    +91 90444 30809
                  </a>
                </li>
                <li>
                  ✉️{' '}
                  <a href="mailto:greenpitchturf@gmail.com" className="hover:text-gold transition-colors">
                    greenpitchturf@gmail.com
                  </a>
                </li>
                <li>🕐 Open: 5:00 AM – 11:00 PM Daily</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <p>© {new Date().getFullYear()} Green Pitch Turf. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with{' '}
              <span className="text-gold">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'green-pitch-turf')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
