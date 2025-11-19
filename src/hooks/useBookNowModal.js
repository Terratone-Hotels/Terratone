// src/hooks/useBookNowModal.js
import { create } from "zustand";

const useBookNowModal = create((set) => ({
  openGlobal: false,
  openFromOutside: () => set({ openGlobal: true }),
  closeFromOutside: () => set({ openGlobal: false }),
}));

export default useBookNowModal;
