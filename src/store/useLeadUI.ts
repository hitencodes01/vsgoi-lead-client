import { create } from "zustand";

interface ILeadUI {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useLeadUI = create<ILeadUI>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
