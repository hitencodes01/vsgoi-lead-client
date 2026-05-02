import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLeadStore, type LeadFormData } from "../store/useLeadStore";
import { api } from "../api/axios";
import { useLeadUI } from "../store/useLeadUI";

type SubmitStatus = "idle" | "loading" | "success" | "duplicate" | "error";

export default function NewForm() {
  const { close } = useLeadUI();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const { formData, updateField, resetForm } = useLeadStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    updateField(name as keyof LeadFormData, finalValue as never);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/lead/new", formData);
      localStorage.setItem("leadSubmitted", "true");
      setStatus("success");
      resetForm();
      setTimeout(close, 2000);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setStatus("duplicate");
      } else {
        setStatus("error");
        console.error(error.response?.data?.message ?? "Something went wrong");
      }
    }
  };

  const handleClose = () => {
    setStatus("idle");
    close();
  };

  const inputClass =
    "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 hover:border-slate-300 transition-all duration-200";

  const selectClass =
    "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 hover:border-slate-300 transition-all duration-200 appearance-none cursor-pointer";

  // ─── Result screen (success or duplicate) ───────────────────────────────────
  if (status === "success" || status === "duplicate") {
    const isSuccess = status === "success";
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">
          {/* Icon */}
          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
              isSuccess ? "bg-emerald-100" : "bg-amber-100"
            }`}
          >
            {isSuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-emerald-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-amber-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          <h2 className="text-lg font-semibold text-slate-800 mb-1">
            {isSuccess ? "Request submitted!" : "Already submitted"}
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            {isSuccess
              ? "We'll reach out within 12 hours. Keep your phone handy!"
              : "We already have your details on file. Our team will be in touch soon."}
          </p>

          <button
            onClick={handleClose}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] ${
              isSuccess
                ? "bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-100"
                : "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-100"
            }`}
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  // ─── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-br from-violet-600 to-indigo-600 px-6 py-5 sm:px-8 sm:py-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-20 rounded-full p-2 text-white/70 hover:text-white hover:bg-white/20 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 pointer-events-none"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-white relative z-10">
            Start your journey
          </h2>
          <p className="text-violet-200 mt-1 text-sm relative z-10">
            Fill out the form below to get a free callback.
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-7 bg-slate-50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="9876543210"
                  value={formData.contactNo}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Course & Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Interested Course
                </label>
                <select
                  name="interestedCourse"
                  value={formData.interestedCourse}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option disabled value="">
                    Choose a course
                  </option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                  <option value="BCA">BCA</option>
                  <option value="BTECH">B-Tech</option>
                  <option value="ITI">ITI</option>
                  <option value="POLYTECHNIC">Polytechnic</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option disabled value="">
                    Where did you find us?
                  </option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="wom">Word of Mouth</option>
                </select>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-3 p-3.5 border border-slate-200 bg-white rounded-xl cursor-pointer hover:bg-violet-50 hover:border-violet-200 transition-all duration-200 group">
              <div className="relative flex items-center justify-center shrink-0">
                <input
                  type="checkbox"
                  name="isIn12"
                  checked={formData.isIn12}
                  onChange={handleChange}
                  className="peer h-4.5 w-4.5 cursor-pointer appearance-none rounded border-2 border-slate-300 checked:border-violet-500 checked:bg-violet-500 transition-all duration-200"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-violet-700 select-none transition-colors duration-200">
                I am currently studying in 12th grade
              </span>
            </label>

            {/* 12-hour notice */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <span className="inline-block w-2 h-2 min-w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <p className="text-xs sm:text-sm text-amber-700">
                We will reach you within{" "}
                <span className="font-semibold text-amber-800">12 hours</span>{" "}
                of your callback request.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-1 py-3 px-6 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Get Free Callback
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
