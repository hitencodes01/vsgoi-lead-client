import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

type State = {
  username: string;
  password: string;
};

export default function AdminLogin() {
  const [state, setState] = useState<State>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.password || !state.username) {
      window.alert("Please fill in all fields.");
      return;
    }
    try {
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden font-sans">
      {/* ── LEFT PANEL — Building Photo ── */}
      <div className="relative hidden md:flex md:w-[55%] h-full flex-col justify-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/building.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060f1c]/92 via-[#060f1c]/25 to-transparent" />

        <div className="relative z-10 p-10 pb-12 select-none">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-blue-400/70" />
            <span
              className="text-blue-300/75 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Est. since 1994
            </span>
          </div>
          <h1
            className="text-white text-3xl lg:text-[32px] font-semibold leading-snug max-w-sm"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Dr. Virendra Swarup
            <br />
            <span className="text-blue-300">Group of Institutions</span>
          </h1>
          <p
            className="mt-3 text-white/45 text-sm max-w-xs leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Transforming Passion into Careers
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center h-full px-6 py-10 relative"
        style={{ background: "#06101e" }}
      >
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 38%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Mobile title */}
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
              className="text-blue-400/65 text-xs tracking-[0.18em] uppercase mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Admin Portal
            </p>
            <h2
              className="text-white text-2xl font-semibold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sign in
            </h2>
            <p
              className="text-white/38 text-sm mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium tracking-wide text-white/45 uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <User className="w-4 h-4 text-white/25" />
                </div>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={state.username}
                  onChange={(e) =>
                    setState({ ...state, username: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.55)";
                    e.currentTarget.style.background = "rgba(59,130,246,0.07)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(59,130,246,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.09)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium tracking-wide text-white/45 uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <Lock className="w-4 h-4 text-white/25" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.55)";
                    e.currentTarget.style.background = "rgba(59,130,246,0.07)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(59,130,246,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.09)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200 bg-blue-600 hover:bg-blue-500 active:scale-[0.98]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}
