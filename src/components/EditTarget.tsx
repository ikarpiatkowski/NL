'use client';
import { Button } from '@/componentsShadCn/ui/button';
import useEditTargets from '@/hooks/useEditTargets';

const EditTarget = () => {
  const editTargetsModal = useEditTargets();
  const handleEdit = () => {
    return editTargetsModal.onOpen();
  };

  return (
    <Button className="m-4" onClick={() => handleEdit()}>
      Edit nutrition targets
    </Button>
  );
};
export default EditTarget;
