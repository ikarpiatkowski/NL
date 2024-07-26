'use client';
import { useEffect, useState } from 'react';
import SubscribeModal from '@/components/modals/SubscribeModal';
import { ProductWithPrice } from '@/types';
import AuthModal from '@/components/modals/AuthModal';
import UploadModal from '@/components/modals/UploadModal';
import EditFoodModal from '@/components/modals/EditFoodModal';
import AddFoodModal from '@/components/modals/AddFoodModal';
import EditFoodTargets from '@/components/EditFoodTargets';
interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <EditFoodModal />
      <AddFoodModal />
      <EditFoodTargets />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
