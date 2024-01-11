'use client';
import { Button } from '@/componentsShadCn/ui/button';
import useAddFood from '@/hooks/useAddFood';

const AddFood = () => {
  const addFoodModal = useAddFood();
  const handleAdd = () => {
    return addFoodModal.onOpen();
  };

  return (
    <Button className="my-4" onClick={() => handleAdd()}>
      Add
    </Button>
  );
};
export default AddFood;
