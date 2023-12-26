'use client';
import { useEffect, useState } from 'react';
import SubscribeModal from '@/components/SubscribeModal';
import { ProductWithPrice } from '@/types';
import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import EditFoodModal from '@/components/EditFoodModal';
import AddFoodModal from '@/components/AddFoodModal';
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
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
