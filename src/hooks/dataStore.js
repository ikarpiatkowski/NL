import { create } from 'zustand';

const useDateStore = create((set) => ({
  selectedDate: new Date(),
  setNewDate: (newDate) => set({ selectedDate: newDate }),
}));

export default useDateStore;
