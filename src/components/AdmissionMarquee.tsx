import { GraduationCap, BookOpen, Briefcase, Phone, Clock } from "lucide-react";

const items = [
  { icon: GraduationCap, text: "Admissions Open for 2026 Session" },
  { icon: BookOpen, text: "BBA, MBA, BCA, B.Tech, ITI & Polytechnic Programs" },
  { icon: Briefcase, text: "Placement Assistance & Career Guidance" },
  { icon: Phone, text: "Get Expert Counseling Support" },
  { icon: Clock, text: "Limited Seats Available – Apply Now" },
];

export default function AdmissionMarquee() {
  return (
    <div className="sticky w-full overflow-hidden bg-linear-to-r from-violet-700 via-indigo-600 to-violet-700 py-2.5">
      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-violet-700 to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-violet-700 to-transparent" />

      {/* Marquee Content */}
      <div className="flex w-max animate-marquee items-center gap-6">
        {[...items, ...items].map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide text-white"
            >
              <Icon className="h-4 w-4 text-white/80" />
              <span>{item.text}</span>

              {/* Separator */}
              <span className="ml-6 text-white/40">•</span>
            </div>
          );
        })}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
