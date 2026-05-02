import AdmissionMarquee from "../../components/AdmissionMarquee";
import { useLeadUI } from "../../store/useLeadUI";

import Navbar from "./Navbar";

import TopBar from "./TopBar";

const COURSES = ["B.Tech", "BBA", "BCA", "MBA", "ITI", "Polytechnic"];

export default function HeroSection() {
  const open = useLeadUI((s) => s.open);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* <AnnouncementBar /> */}
      <TopBar />
      <Navbar />
      <AdmissionMarquee />
      {/* <SocialLinkBanner /> */}

      {/* Hero */}
      <section className="relative flex-1 overflow-hidden bg-linear-to-br from-orange-500 via-orange-400 to-yellow-300">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-blue-800/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-900/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl" />

        {/* Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-5 text-white text-center lg:text-left">
            {/* Badge */}
            <div>
              <span className="inline-block bg-yellow-300 text-black text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-md animate-pulse">
                🎓 Admissions Open 2026
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              No Matter Your Score in Class 12th,
              <br />
              <span className="text-blue-900">We Shape Your Future</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Join thousands of students building successful careers at VSGOI &
              CMS — Kanpur's trusted institution for quality education.
            </p>

            {/* Courses */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {COURSES.map((course) => (
                <span
                  key={course}
                  className="bg-blue-800/90 hover:bg-blue-900 transition text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm"
                >
                  {course}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-2">
              <button
                onClick={open}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-[1.03]"
              >
                Get Admission Easily
              </button>

              <a
                href="tel:+917311105831"
                className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-800 transition"
              >
                Call Us
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full max-w-md flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "10,000+", label: "Students Enrolled" },
                { value: "6+", label: "Programs Offered" },
                { value: "100%", label: "Placement Support" },
                { value: "25+", label: "Years of Excellence" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center text-white shadow-md hover:scale-105 transition"
                >
                  <div className="text-xl sm:text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/80 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Accreditation */}
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center shadow-md">
              <p className="text-white/70 text-xs uppercase tracking-wider mb-2">
                Accredited By
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["AICTE", "ISO", "UGC", "NAAC"].map((acc) => (
                  <span
                    key={acc}
                    className="bg-white text-blue-800 text-xs font-bold px-3 py-1.5 rounded-md shadow-sm"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white/70 text-xs text-center py-3 px-4">
        © 2025 VSGOI & CMSCSJM · Kanpur, UP ·{" "}
        <a
          href="https://www.vsgoi.in"
          target="_blank"
          className="underline hover:text-white"
        >
          vsgoi.in
        </a>{" "}
        ·{" "}
        <a
          href="https://www.cmscsjm.org"
          target="_blank"
          className="underline hover:text-white"
        >
          cmscsjm.org
        </a>
      </footer>
    </div>
  );
}
