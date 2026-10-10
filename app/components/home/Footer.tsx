import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  Share2
} from 'lucide-react';
import { Link } from 'react-router';

import IEEE from "../../assets/IEEE.png";

// --- Data Models ---
interface LinkItem {
  label: string;
  href: string;
}

interface SocialItem extends LinkItem {
  icon: React.ElementType;
}

// --- Constants ---
const QUICK_LINKS: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Membership', href: '/membership' },
];

const RESOURCES: LinkItem[] = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Archives', href: '/archives' },
];

const SOCIAL_LINKS: SocialItem[] = [
  { label: 'Global Network', href: '#', icon: Globe },
  { label: 'Community', href: '#', icon: Users },
  { label: 'Share', href: '#', icon: Share2 },
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

          {/* Column 2: Quick Links */}
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
                <a href="mailto:contact@ieee-sb.org" className="hover:text-white transition-colors">
                  contact@ieee-sb.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-[#4460EF] mt-1 flex-shrink-0" size={20} />
                <span>
                  University Campus, Engineering Block A, Room 402
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-[#4460EF] mt-1 flex-shrink-0" size={20} />
                <a href="tel:+15550001234" className="hover:text-white transition-colors">
                  +1 (555) 000-1234
                </a>
              </li>
            </ul>

            {/* Social Media Circle Buttons (#4460EF background, #CBD5E1 icons) */}
            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="h-10 w-10 rounded-full bg-[#4460EF] flex items-center justify-center text-[#CBD5E1] hover:bg-[#3450DF] hover:text-white transition-colors duration-200 shadow-md"
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
          <p>© {new Date().getFullYear()} IEEE Student Branch. All rights reserved.</p>
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