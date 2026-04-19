import { useEffect, useReducer, useState } from "react";
import { api } from "../api/axios";
import { useAuth } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { PhoneCallIcon, ShieldCheck } from "lucide-react";

const roles = [
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
  },
  { id: "associate", label: "Associate", icon: PhoneCallIcon },
];

type LoginState = {
  userName: string;
  password: string;
  role: "admin" | "associate" | null;
};

type LoginActions = {
  field: keyof LoginState;
  value: string;
};

function reducer(state: LoginState, actions: LoginActions): LoginState {
  return {
    ...state,
    [actions.field]: actions.value,
  };
}

export default function Login() {
  useEffect(()=>{
      document.title = `VSGOI | Login`
    },[])
  const { login } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    userName: "",
    password: "",
    role: null,
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleFormSuccess = () => {
    setTimeout(() => {
      setSuccess(true);
    }, 2000);
  };

  const handleInput = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/secUser/login", state);
      if (res.data.success) {
        const user = res.data.user;
        login(user);
        handleFormSuccess();
        navigate(`/${user.role}`);
      }
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">

      {!success && !error && (
        <div className="relative w-full max-w-lg group">
          {/* Decorative Outer Glow */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

          <div className="relative card bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl">
            <div className="card-body p-6 md:p-10">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Secure access to your dashboard
                </p>
              </div>

              <form onSubmit={handleInput} className="space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                        />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter username"
                      pattern="[A-Za-z][A-Za-z0-9\-]*"
                      minLength={3}
                      maxLength={30}
                      title="Only letters, numbers or dash"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                      onChange={(e) =>
                        dispatch({ field: "userName", value: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                        />
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      minLength={8}
                      pattern="(?=.*[a-z]).{8,}"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                      onChange={(e) =>
                        dispatch({ field: "password", value: e.target.value })
                      }
                    />
                  </div>
                  {/* Kept your hidden hint logic for accessibility/validation */}
                  <p className="validator-hint hidden text-xs text-slate-500 mt-1">
                    8+ chars: 1 Number, 1 Lowercase, 1 Uppercase.
                  </p>
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      const isActive = state.role === role.id;
                      return (
                        <div
                          key={role.id}
                          onClick={() =>
                            dispatch({ field: "role", value: role.id })
                          }
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group/role ${
                            isActive
                              ? "bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                              : "bg-slate-800/30 border-slate-800 text-slate-500 hover:border-slate-600 hover:bg-slate-800/50"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${isActive ? "animate-pulse" : "opacity-70 group-hover/role:opacity-100"}`}
                          />
                          <p className="font-bold text-xs uppercase tracking-tighter">
                            {role.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Login Successfully</span>
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Invalid credentials</span>
        </div>
      )}
    </div>
  );
}
