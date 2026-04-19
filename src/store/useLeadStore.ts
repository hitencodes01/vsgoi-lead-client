import { create } from "zustand";

export interface LeadFormData {
  name: string;
  contactNo: string;
  email: string;
  interestedCourse: "BBA" | "MBA" | "BCA" | "BTech" | "ITI" | "POLYTECHNIC";
  isIn12: boolean;
  source: "facebook" | "instagram" | "wom";
}

export interface LeadStore {
  formData: LeadFormData;
  updateField: <K extends keyof LeadFormData>(
    fieldName: K,
    value: LeadFormData[K],
  ) => void;
  resetForm: () => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  formData: {
    name: "",
    contactNo: "",
    email: "",
    interestedCourse: "BBA",
    isIn12: false,
    source: "facebook",
  },

  updateField: (fieldName, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [fieldName]: value,
      },
    })),

  resetForm: () =>
    set({
      formData: {
        name: "",
        contactNo: "",
        email: "",
        interestedCourse: "BBA",
        isIn12: false,
        source: "facebook",
      },
    }),
}));
