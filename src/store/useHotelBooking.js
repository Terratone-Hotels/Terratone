// src/store/useHotelBooking.js
import { create } from "zustand";

const initialData = {
  selectedProperty: "",
  adults: 2,
  children: 0,
  checkIn: null,
  checkOut: null,
  rooms: [],
  fullName: "",
  phone: "",
};

export const useHotelBooking = create((set) => ({
  data: { ...initialData },

  // Merge partial updates — do not replace the whole object
  setData: (partial) =>
    set((state) => ({
      data: { ...state.data, ...partial },
    })),

  // Reset to initial
  clear: () => set({ data: { ...initialData } }),
}));
