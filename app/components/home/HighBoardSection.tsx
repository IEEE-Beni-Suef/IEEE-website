
import React from 'react';

import chairman from "../../assets/images/highBoard/chairman.jpeg"
import viceChairman from "../../assets/images/highBoard/viceChairman.jpg"
import viceChairwoman from "../../assets/images/highBoard/viceChairwoman.jpg"
import webmaster from "../../assets/images/highBoard/webmaster.jpg"
import treasure from "../../assets/images/highBoard/treasure.jpg"
import secretary from "../../assets/images/highBoard/secretary.jpg"

export interface SocialLinks {
  linkedin?: string;
  email?: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  socials: SocialLinks;
}

// data.ts
export const boardData: BoardMember[] = [
  {
    id: '1',
    name: 'MOHAMED SHARAF',
    role: 'CHAIRMAN',
    imageUrl: chairman, 
    socials: { linkedin: '#', email: 'mailto:#' }
  },
  {
    id: '2',
    name: 'AMR HASSAN',
    role: 'VICE CHAIRMAN',
    imageUrl: viceChairman,
    socials: { linkedin: '#', email: 'mailto:#' }
  },
  {
    id: '3',
    name: 'SAHAR EHAB',
    role: 'VICE CHAIRWOMAN',
    imageUrl: viceChairwoman,
    socials: { linkedin: '#', email: 'mailto:#' }
  },
  {
    id: '4',
    name: 'MOHAMED ELSHISHTAWY',
    role: 'WEBMASTER',
    imageUrl: webmaster,
    socials: { linkedin: '#', email: 'mailto:#' }
  },
  {
    id: '5',
    name: 'SULTAN AMED',
    role: 'TREASURE',
    imageUrl: treasure,
    socials: { linkedin: '', email: 'mailto:#' }
  },
  {
    id: '6',
    name: 'MOHAMED MEDHAT',
    role: 'SECRETARY',
    imageUrl: secretary,
    socials: { linkedin: '#', email: 'mailto:#' }
  }
];



const LinkedInIcon = () => (
  <svg className="w-5 h-5 text-white hover:text-purple-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6 text-white hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MemberCard: React.FC<{ member: BoardMember }> = ({ member }) => (
  <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] bg-gray-900 shadow-xl transition-transform duration-300 hover:-translate-y-2">
    {/* Profile Image */}
    <img 
      src={member.imageUrl} 
      alt={`${member.name} - ${member.role}`}
      className="absolute inset-0 w-full h-full object-cover object-top"
      loading="lazy"
    />
    
    {/* Dark Gradient Overlay for Text Readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

    {/* Social Icons (Top Right) */}
    <div className="absolute top-4 right-4 flex gap-3 z-10">
      {member.socials.linkedin && (
        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      )}
      {member.socials.email && (
        <a href={member.socials.email} aria-label="Email">
          <MailIcon />
        </a>
      )}
    </div>

    {/* Text Content (Bottom Left) */}
    <div className="absolute bottom-0 left-0 w-full p-6 z-10">
      <h3 className="text-white text-xl font-bold tracking-wide uppercase">
        {member.name}
      </h3>
      <p className="text-purple-300 text-sm tracking-wider uppercase mt-1">
        {member.role}
      </p>
    </div>
  </div>
);

export const HighBoardSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f8f9fa] py-20 px-6 overflow-hidden flex justify-center items-center">
      {/* Decorative Background Elements (Simplified Stars/Lines) */}
      <div className="absolute top-10 left-10 text-purple-200/50 hidden md:block">✦</div>
      <div className="absolute bottom-20 right-20 text-purple-200/50 hidden md:block text-4xl">✦</div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-4">
            Meet Our <span className="text-[#5138ed]">High Board</span>
          </h2>
          <p className="text-[#1e3a8a] text-sm md:text-base leading-relaxed">
            "Behind Every Successful Initiative Is A Team Of Dedicated Leaders. Our High Board Work Together To Guide Our Vision, Support Our Community, And Create Opportunities For Growth And Innovation. Their Passion, Teamwork, And Commitment Help Drive Our Organization Forward And Inspire Everyone Around Them".
          </p>
        </div>

        {/* Board Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {boardData.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighBoardSection;