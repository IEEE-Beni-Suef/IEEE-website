import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Mail, 
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Link } from 'react-router';

import IEEE from "../../assets/IEEE.png";

// Custom TikTok SVG Icon
const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.3 6.3 0 0 0 1.95-4.47V8.09a8.28 8.28 0 0 0 4.82 1.43v-3.4a4.85 4.85 0 0 1-1-.43z" />
  </svg>
);

// --- Data Models ---
interface LinkItem {
  label: string;
  href: string;
}

interface SocialItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

// --- Constants ---
// Quick Links matching Navbar items and navigation paths
const QUICK_LINKS: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/#events' },
  { label: 'Ch&G', href: '/#chg' },
  { label: 'Committees', href: '/#committees' },
  { label: 'About', href: '/#about' },
  { label: 'Achievements', href: '/#achievements' },
];

const RESOURCES: LinkItem[] = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Archives', href: '/archives' },
];

const SOCIAL_LINKS: SocialItem[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ieee.bsu',
    icon: Facebook,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ieee_bsusb',
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ieee-benisuef-student-branch/posts/',
    icon: Linkedin,
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#182254] text-[#CBD5E1] min-h-[547px] py-16 font-sans border-t border-[#FFFFFF0D] flex flex-col justify-between">
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1440px] flex-1 flex flex-col justify-between">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pt-6 pb-12">
          
          {/* Column 1: Branding Logo & Join Branch Button */}
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-3">
              <img src={IEEE} alt="IEEE Logo" className="h-12 sm:h-14 object-contain" />
              <div className="h-10 w-[2px] bg-white/40" />
              <div>
                <h3 className="text-white text-lg sm:text-xl font-extrabold tracking-wider leading-tight uppercase">
                  IEEE BENI SUEF
                </h3>
                <p className="text-white/80 text-xs tracking-widest uppercase">
                  STUDENT BRANCH
                </p>
              </div>
            </div>

            <Link 
              to="/register" 
              className="inline-flex items-center justify-between gap-4 bg-[#4460EF] hover:bg-[#3450DF] text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95"
            >
              <span>Join Our Branch</span>
              <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center">
                <ArrowRight size={14} className="text-white" />
              </div>
            </Link>
          </div>

          {/* Column 2: Quick Links (Matches Navbar Navigation) */}
          <nav aria-label="Quick Links" className="lg:pl-4">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm sm:text-base text-gray-300">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Resources */}
          <nav aria-label="Resources">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-4 text-sm sm:text-base text-gray-300">
              {RESOURCES.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact Info & Socials */}
          <div className="space-y-6">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm sm:text-base text-gray-300">
              <li className="flex items-start gap-3">
                <Mail className="text-[#4460EF] mt-1 flex-shrink-0" size={20} />
                <a href="mailto:benisuef.ieee@gmail.com" className="hover:text-white transition-colors">
                  benisuef.ieee@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-[#4460EF] mt-1 flex-shrink-0" size={20} />
                <span>
                  Beni Suef, Egypt
                </span>
              </li>
            </ul>

            {/* Social Media Circle Buttons (Facebook, Instagram, LinkedIn, TikTok) */}
            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-10 w-10 rounded-full bg-[#4460EF] flex items-center justify-center text-[#CBD5E1] hover:bg-[#3450DF] hover:text-white transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Credits */}
        <div className="pt-8 border-t border-[#FFFFFF0D] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#64748B]">
          <p>© {new Date().getFullYear()} IEEE Beni Suef Student Branch. All rights reserved.</p>
          <p>
            Designed by{' '}
            <span className="text-[#4460EF] font-semibold">IEEE Student Branch</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;