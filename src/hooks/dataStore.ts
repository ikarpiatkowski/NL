import { create } from 'zustand';

interface DateStore {
  selectedDate: Date;
  setNewDate: (newDate: Date) => void;
}

const useDateStore = create<DateStore>((set) => ({
  selectedDate: new Date(),
  setNewDate: (newDate) => set({ selectedDate: newDate }),
}));

export default useDateStore;
