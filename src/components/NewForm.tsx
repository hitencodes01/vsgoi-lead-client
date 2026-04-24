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
  const [alreadySubmit, setAlreadySubmit] = useState<boolean>(false);
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
        resetForm();
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setAlreadySubmit(true);
        console.log("already exists");
      } else {
        console.log(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      {!success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(30,58,138,0.3)] overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-br from-blue-800 via-blue-700 to-blue-600 p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl opacity-30" />
              <button
                className="absolute cursor-pointer top-4 right-4 rounded-full transition-colors z-10"
                onClick={() => setIsPop(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="36"
                  height="36"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#f44336"
                    d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
                  ></path>
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
                {/* Name */}
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:-translate-y-0.5 outline-none transition-all duration-200"
                    required
                  />
                </div>

                {/* Phone & Email */}
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:-translate-y-0.5 outline-none transition-all duration-200"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:-translate-y-0.5 outline-none transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Course & Source */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Interested Course
                    </label>
                    <select
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all duration-200 appearance-none"
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
                      <option value="POLYTECHNIC">Polytechnic</option>
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all duration-200 appearance-none"
                      required
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
                <label className="flex items-center gap-3 p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
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

                {/* ✅ NEW: 12-hour callback notice */}
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <span className="inline-block w-2 h-2 min-w-[8px] rounded-full bg-amber-400 animate-pulse" />
                  <p className="text-xs sm:text-sm font-semibold text-amber-800">
                    We will reach you within{" "}
                    <span className="text-amber-600 font-bold">12 hours</span>{" "}
                    of your callback request.
                  </p>
                </div>

                {/* ✅ FIXED: Button with explicit white text color */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-[0_8px_20px_-6px_rgba(220,38,38,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(220,38,38,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span className="text-white font-bold text-lg">
                    Get Free Callback
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white transition-transform duration-200 group-hover:translate-x-1"
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

      {(success || alreadySubmit) && (
        <div className="alert  fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-2">
              {success ? "Success" : "Already Submitted"}
            </h2>

            <p className="text-gray-600 mb-4">
              {success
                ? "Submitted Successfully!"
                : "Thank you! We already have your details."}
            </p>

            <button
              onClick={() => {
                setSuccess(false);
                setAlreadySubmit(false);
                setIsPop(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
