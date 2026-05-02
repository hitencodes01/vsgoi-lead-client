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
export default function TopBar() {
  return (
    <div className="w-full bg-blue-700 text-white text-xs">
      <div className="max-w-7xl text-[10px] mx-auto px-4 sm:px-6 sm:text-[3px] py-2 flex items-center justify-between">
        {/* LEFT: Address */}
        <div className="truncate font-medium tracking-wide text-[11px] sm:text-xs">
          Ragendra Swarup Knowledge City, Kanpur — Lucknow NH-27
        </div>

        {/* RIGHT: DESKTOP (all links) */}
        <div className="hidden lg:flex items-center gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 hover:border-white transition"
            >
              <span className="opacity-90 group-hover:opacity-100">
                {link.icon}
              </span>

              <span className="text-white/90 group-hover:text-white text-xs">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* RIGHT: MOBILE (important only) */}
        <div className="flex lg:hidden items-center gap-3 text-[11px]">
          {/* Phone */}
          <a
            href="tel:+917311105831"
            className="flex items-center gap-1 text-white/90"
          >
            <span>{SOCIAL_LINKS[3].icon}</span>
          </a>

          {/* Email */}
          <a
            href="mailto:admission.vsgoi@vsmt.org"
            className="flex items-center gap-1 text-white/90"
          >
            <span className="truncate max-w-30">{SOCIAL_LINKS[5].icon}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
