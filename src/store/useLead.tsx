import { create } from "zustand";
import type { Lead } from "../types";

interface ILead {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
}

export const LeadStore = create<ILead>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
}));
