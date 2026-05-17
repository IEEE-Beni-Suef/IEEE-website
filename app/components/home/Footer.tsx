import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook, 
  Instagram,
  Youtube
} from 'lucide-react';

import { Link } from 'react-router';


const TikTok = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);


import IEEE from "../../assets/IEEE.png"

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
  { label: 'Facebook', href: 'https://www.facebook.com/ieee.bns', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/ieee_bsusb', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ieee-benisuef-student-branch/', icon: Linkedin },
  { label: 'TikTok', href: 'https://www.tiktok.com/@ieeebsusb', icon: TikTok },
  { label: 'YouTube', href: 'https://youtube.com/@ieeebsusb', icon: Youtube },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#150A2E] text-gray-300 py-12 font-sans border-t border-purple-900/30">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Branding & Call to Action */}
          <div className="flex flex-col items-start lg:col-span-1">
            <div className="mb-8 w-full flex items-center justify-center">
              <img src={IEEE} alt="IEEE Beni Suef Student Branch" className="w-1/2 h-1/2 object-contain" />
              <h3 className='text-white text-xl font-semibold border-2 border-white border-5 border-r-0 border-b-0 border-t-0 pl-3'>IEEE Beni Suef Student Branch</h3>
            </div>

            <Link to="/login" className="flex items-center gap-2  bg-[#6121B6] hover:bg-[#501A96] text-white px-15 py-3 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#150A2E]">
              Join Our Branch <ArrowRight size={18} />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Quick Links">
            <h3 className="text-white text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Resources */}
          <nav aria-label="Resources">
            <h3 className="text-white text-xl font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              {RESOURCES.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail className="text-[#6121B6] mt-1 flex-shrink-0" size={20} />
                <a href="mailto:ieee.bsu@bsu.edu.eg" className="hover:text-white transition-colors">
                  ieee.bsu@bsu.edu.eg
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-[#6121B6] mt-1 flex-shrink-0" size={20} />
                <span>
                  Beni-Suef University, Faculty of Engineering, Beni-Suef, Egypt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-[#6121B6] mt-1 flex-shrink-0" size={20} />
                <a href="tel:+15550001234" className="hover:text-white transition-colors">
                  +20 123 456 789
                </a>
              </li>
            </ul>

            {/* Social Media Icons (Updated per request) */}
            <div className="flex gap-4 mt-8">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`Visit our ${social.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-[#35156B] flex items-center justify-center text-white hover:bg-[#6121B6] transition-colors duration-200"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Credits */}
        <div className="pt-8 border-t border-purple-900/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} IEEE Student Branch. All rights reserved.</p>
          <p>
            Designed by{' '}
            <span className="text-[#8B5CF6] font-medium">IEEE Student Branch</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;