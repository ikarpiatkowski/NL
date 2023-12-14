import { create } from 'zustand';

interface AddFoodStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddFood = create<AddFoodStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddFood;
