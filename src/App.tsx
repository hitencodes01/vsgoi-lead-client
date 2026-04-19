import { useEffect, useState } from "react";
import NewForm from "./components/NewForm";
import { useAuth } from "./store/useAuthStore";
import { useSocket } from "./hooks/useSocket";

const COURSES = ["B.Tech", "BBA", "BCA", "MBA", "ITI", "Polytechnic"];

const SOCIAL_LINKS = [
  {
    label: "vsgoi.in",
    href: "https://www.vsgoi.in",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
        />
      </svg>
    ),
  },

  {
    label: "instagram",
    href: "https://www.instagram.com/vsgoi_unnao.in/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
        />
      </svg>
    ),
  },
  {
    label: "facebook",
    href: "https://www.facebook.com/vsgoi.in",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
        />
      </svg>
    ),
  },
  {
    label: "+91 73111 05831",
    href: "tel:+917311105831",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    label: "+91 99199 04500",
    href: "tel:+919919904500",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    label: "admission.vsgoi@vsmt.org",
    href: "mailto:admission.vsgoi@vsmt.org",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function App() {
  const { auth } = useAuth();
  useSocket(auth ?? null);

  const [isPop, setIsPop] = useState<boolean>(false);

  useEffect(() => {
    const isSubmitted = localStorage.getItem("leadSubmitted");
    if (!isSubmitted) {
      const timeoutId = setTimeout(() => setIsPop(true), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const isLeadSubmitted = localStorage.getItem("leadSubmitted");
      if (!isLeadSubmitted) setIsPop(true);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSuccess = () => {
    setTimeout(() => setIsPop(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Announcement Bar */}
      <div className="bg-blue-700 text-white text-xs sm:text-sm text-center py-2 px-4 font-medium tracking-wide">
        {"📍 Ragendra Swarup Knowledge City, Kanpur — Lucknow NH-27"}
      </div>

      {/* Navbar */}
      <div className="navbar bg-white shadow-md px-4 md:px-10 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="flex items-center gap-2">
            <div className="flex gap-5 text-white font-extrabold text-lg px-3 py-1 rounded-lg tracking-tight">
              <img
                src="./assets/download.jpg"
                alt="logo"
                className="h-12 w-28  object-cover ring-2 ring-blue-500"
              />
              <img
                src="./assets/cms.jpg"
                alt="logo"
                className="h-12 w-12  object-cover ring-2 ring-blue-500"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-bold text-gray-700">
                {"VSGOI & CMS"}
              </span>
              <span className="text-[10px] text-gray-400">
                {"Transforming Passion into Careers"}
              </span>
            </div>
          </div>
        </div>

        <div className=" font-['Montserrat'] navbar-center text-blue-800 font-bold text-2xl hidden lg:flex">
          {"Dr. Virendra Swarup Group Of Institution"}
        </div>

        <div className="navbar-end gap-2">
          <a
            href="tel:+917311105831"
            className="btn btn-sm btn-outline
            btn-primary hidden sm:flex rounded-xl"
          >
            {"📞 Call Now"}
          </a>
          <button
            className="btn btn-sm btn-primary rounded-xl"
            onClick={() => setIsPop(true)}
          >
            {"Apply Now"}
          </button>

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white rounded-box w-44 z-50 text-sm"
            >
              {COURSES.map((c) => (
                <li key={c}>
                  <a>{c}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex justify-center items-center py-2">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-black/90 hover:text-blue-800 text-xs sm:text-sm font-medium underline-offset-2 hover:underline transition"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative flex-1 bg-linear-to-br from-orange-500 via-orange-400 to-yellow-300 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-700 opacity-10 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900 opacity-10 rounded-full translate-y-1/3 -translate-x-1/3" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-6 text-white">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="badge badge-warning text-black font-bold px-4 py-3 text-sm animate-pulse rounded-xl shadow">
                {"🎓 ADMISSION OPEN 2026"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
              {"No Matter Your Score in Class 12th, "}
              <span className="text-blue-900">{"We Shape Your Future"}</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/90 text-base md:text-lg font-medium max-w-md">
              {
                "Join thousands of students building successful careers at VSGOI & CMS — Kanpur's most trusted institution."
              }
            </p>

            {/* Course Chips */}
            <div className="flex flex-wrap gap-2">
              {COURSES.map((course) => (
                <span
                  key={course}
                  className="bg-blue-700 hover:bg-blue-800 transition text-white text-sm font-bold px-4 py-2 rounded-xl shadow cursor-default"
                >
                  {course}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                className="btn btn-primary bg-blue-700 border-none hover:bg-blue-800 rounded-xl shadow-lg px-6 text-white font-bold"
                onClick={() => setIsPop(true)}
              >
                {"Get Admission Easily ✅"}
              </button>
              <a
                href="tel:+917311105831"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-700 rounded-xl font-bold px-6"
              >
                {"📞 Call Us"}
              </a>
            </div>

            {/* Contact Links */}
          </div>

          {/* Right: Stats + Accreditation */}
          <div className="shrink-0 w-full max-w-xs flex flex-col gap-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "10,000+", label: "Students Enrolled" },
                { value: "6+", label: "Programs Offered" },
                { value: "100%", label: "Placement Support" },
                { value: "25+", label: "Years of Excellence" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 text-center text-white shadow"
                >
                  <div className="text-2xl font-extrabold">{stat.value}</div>
                  <div className="text-xs font-medium text-white/80 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Accreditation */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 text-center shadow">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                {"Accredited By"}
              </p>
              <div className="flex justify-center flex-wrap gap-2">
                {["AICTE", "ISO", "UGC", "NAAC"].map((acc) => (
                  <span
                    key={acc}
                    className="badge badge-ghost bg-white text-blue-800 font-bold text-xs px-3 py-2 rounded-lg shadow-sm"
                  >
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-900 text-white/70 text-xs text-center py-3 px-4">
        {"© 2025 VSGOI & CMSCSJM · Kanpur, UP · "}
        <a
          href="https://www.vsgoi.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          {"vsgoi.in"}
        </a>
        {" · "}
        <a
          href="https://www.cmscsjm.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          {"cmscsjm.org"}
        </a>
      </div>

      {/* Lead Form Popup */}
      {isPop && <NewForm onSuccess={handleFormSuccess} setIsPop={setIsPop} />}
    </div>
  );
}
