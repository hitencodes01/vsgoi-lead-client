import { Book, PenLine, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "admin",
    icon: ShieldCheck,
    label: "Admin",
    desc: "Manage institution-wide settings",
  },
  {
    id: "faculty",
    icon: PenLine,
    label: "Faculty",
    desc: "Access courses & attendance",
  },
  {
    id: "student",
    icon: Book,
    label: "Student",
    desc: "View results & timetables",
  },
];

export default function ErpLogin() {
  useEffect(() => {
    document.title = "VSGOI | ERP-LOGIN";
  }, []);

  const [selected, setSelected] = useState<"admin" | "faculty" | "student" | "">("");
  const navigate = useNavigate();

  const handleRole = () => {
    if (!selected) {
      window.alert("Please select a role to continue.");
      return;
    }
    navigate(`/erp/${selected}`);
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden font-sans">
      {/* ── LEFT PANEL — Building Photo ── */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-[55%] h-full flex-col justify-end">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/building.jpeg')" }}
        />
        {/* Gradient overlay — bottom fade for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/90 via-[#0a1628]/30 to-transparent" />

        {/* Bottom-left branding block */}
        <div className="relative z-10 p-10 pb-12 select-none">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-blue-400/70" />
            <span
              className="text-blue-300/80 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Est. since 1994
            </span>
          </div>
          <h1
            className="text-white text-3xl lg:text-4xl font-semibold leading-snug max-w-sm"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dr. Virendra Swarup
            <br />
            <span className="text-blue-300">Group of Institutions</span>
          </h1>
          <p
            className="mt-3 text-white/50 text-sm max-w-xs leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Transforming Passion into Carrers
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center h-full px-6 py-10 relative"
        style={{ background: "#06101e" }}
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Mobile-only title */}
        <div className="md:hidden text-center mb-8 relative z-10">
          <h1
            className="text-white text-2xl font-semibold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dr. Virendra Swarup
            <br />
            <span className="text-blue-400">Group of Institutions</span>
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <p
              className="text-blue-400/70 text-xs tracking-[0.18em] uppercase mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Enterprise Resource Portal
            </p>
            <h2
              className="text-white text-2xl font-semibold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Welcome back
            </h2>
            <p
              className="text-white/40 text-sm mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Select your role to access the portal
            </p>
          </div>

          {/* Role cards */}
          <div className="flex flex-col gap-3 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = selected === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id as any)}
                  className={`group flex items-center gap-4 w-full px-5 py-4 rounded-xl border text-left transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600/20 border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.4)]"
                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                    }`}
                >
                  {/* Icon circle */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
                      ${isActive ? "bg-blue-500/30" : "bg-white/[0.07] group-hover:bg-white/10"}`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-blue-300" : "text-white/50 group-hover:text-white/80"}`}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${isActive ? "text-white" : "text-white/60 group-hover:text-white/90"}`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {role.label}
                    </p>
                    <p
                      className="text-xs text-white/30 mt-0.5 truncate"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {role.desc}
                    </p>
                  </div>

                  {/* Active indicator */}
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-200 ${isActive ? "bg-blue-400 scale-100" : "bg-transparent scale-0"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Enter button */}
          <button
            onClick={handleRole}
            disabled={!selected}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-200
              ${
                selected
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 hover:shadow-blue-800/50 active:scale-[0.98]"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Enter Portal
          </button>


        </div>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}