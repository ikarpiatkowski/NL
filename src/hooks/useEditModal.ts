import { create } from 'zustand';

interface EditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  foodId: number;
  setFoodId: (newId: number) => void;
}

const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  foodId: 0,
  setFoodId: (newId) => set({ foodId: newId }),
}));

export default useEditModal;
