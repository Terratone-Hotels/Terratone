import { create } from "zustand";

export const useEasterEggStore = create((set) => ({
  snowActive: false,
  triggerSnow: () => {
    set({ snowActive: true });
    setTimeout(() => set({ snowActive: false }), 7000);
  },
}));
