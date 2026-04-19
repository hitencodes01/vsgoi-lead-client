import { useState, type ChangeEvent } from "react";
import { useLeadStore, type LeadFormData } from "../store/useLeadStore";
import { api } from "../api/axios";

export default function NewForm({
  onSuccess,
  setIsPop,
}: {
  onSuccess: () => void;
  setIsPop: (value: boolean) => void;
}) {
  const [success, setSuccess] = useState<boolean>(false);
  const { formData, updateField, resetForm } = useLeadStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const finalValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;
    updateField(name as keyof LeadFormData, finalValue as never);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/lead/new", formData);
      if (res) {
        localStorage.setItem("leadSubmitted", "true");
        setSuccess(true);
        onSuccess();
      }
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
    resetForm();
  };

  return (
    <>
      {!success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          {/* Modal Card: Crisp white for legibility, rounded for a modern feel */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(30,58,138,0.3)] overflow-hidden">
            {/* Header: Deep blue gradient for strong brand presence */}
            <div className="bg-linear-to-r from-blue-800 to-blue-950 p-6 sm:p-8 text-center relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-overlay filter blur-xl opacity-30"></div>

              <button
                className="absolute cursor-pointer top-4 right-4 text-blue-200 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-10"
                onClick={() => setIsPop(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight relative z-10">
                Start Your Journey
              </h2>
              <p className="text-blue-200 mt-2 text-sm sm:text-base font-medium relative z-10">
                Fill out the form below to get a free callback.
              </p>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8 bg-slate-50">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all duration-200"
                    required
                  />
                </div>

                {/* Grid for Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Please enter exactly 10 digits"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:-translate-y-0.5 focus:shadow-lg focus:border-blue-600 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Grid for Selects */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Interested Course
                    </label>
                    <select
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all duration-200 appearance-none"
                      required
                    >
                      <option disabled value="">
                        Choose a Course
                      </option>
                      <option value="BBA">BBA</option>
                      <option value="MBA">MBA</option>
                      <option value="BCA">BCA</option>
                      <option value="BTECH">B-Tech</option>
                      <option value="ITI">ITI</option>
                      <option value="POLYTECHNIC">POLYTECHNIC</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Source
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all duration-200 appearance-none"
                      required
                    >
                      <option disabled value="">
                        Where did you find us?
                      </option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="wom">Word of mouth</option>
                    </select>
                  </div>
                </div>

                {/* Custom Checkbox */}
                <label className="flex items-center gap-3 p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 mt-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="isIn12"
                      checked={formData.isIn12}
                      onChange={handleChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 checked:border-blue-600 checked:bg-blue-600 transition-all"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 select-none">
                    I am currently studying in 12th grade
                  </span>
                </label>

                {/* Vibrant Red Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(220,38,38,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Get Callback
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
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
          <span>Submit Successfully</span>
        </div>
      )}
    </>
  );
}
