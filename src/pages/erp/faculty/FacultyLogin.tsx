import { useState } from "react";
type State = {
  username: string | null;
  password: string | null;
};
export default function FacultyLogin() {
  const [state, setState] = useState<State>({
    username: "",
    password: "",
  });
  const handleFacultyLogin = (e: any) => {
    e.preventDefault();
    if (!state.password || !state.username) {
      window.alert("invalid details")
    }
    try {
      console.log(state)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: "url('/why_cms.png')",
      }}
    >
      <h1 className="fixed top-0 bg-white/50 backdrop-blur-md w-full p-2 text-black text-2xl lg:text-4xl   text-center font-bold">
        Dr. Virendra Swarup Group Of Institution
      </h1>

      <form
        onSubmit={handleFacultyLogin}
        className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20 flex flex-col gap-5"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
          Admin Login
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm text-black">
            Username
          </label>
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            className="px-4 py-2 rounded-lg bg-white/20 text-blue-600 placeholder-blue-600 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-black">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="px-4 py-2 rounded-lg bg-white/20 text-blue-600 placeholder-blue-600 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="mt-2 uppercase py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Enter Portal
        </button>
      </form>
    </div>
  );
}
