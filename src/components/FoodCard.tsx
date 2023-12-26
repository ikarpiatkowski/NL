'use client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/componentsShadCn/ui/card';
import { Button } from '@/componentsShadCn/ui/button';
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from '@/componentsShadCn/ui/hover-card';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useEditModal from '@/hooks/useEditModal';

export default function FoodCard({ foodData }: any) {
  const router = useRouter();
  const editModal = useEditModal();
  const supabaseClient = useSupabaseClient();

  const { setFoodId } = editModal;

  const handleEdit = ({ foodId }: any) => {
    setFoodId(foodId);
    return editModal.onOpen();
  };
  const handleDelete = async ({ foodId }: any) => {
    const { error } = await supabaseClient
      .from('userFood')
      .delete()
      .eq('id', foodId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Food removed successfully');
    }

    router.refresh();
  };
  return (
    <>
      {foodData?.map((f: any) => (
        <div key={f.id}>
          <Card className="bg-white shadow rounded-xl overflow-hidden w-fit m-2">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold w-60 truncate">
                {f.name}
              </CardTitle>
              <CardDescription className="flex justify-between text-sm text-gray-500">
                <p>Portion {f.portion}g</p>
                <p>in 100g:</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-yellow-400">Calories</p>
                  <p className="text-sm font-bold text-yellow-400">
                    {f.energy} kcal
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-green-500">Protein</p>
                  <p className="text-sm font-bold text-green-500">
                    {f.protein}g
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-red-500">Fat</p>
                  <p className="text-sm font-bold text-red-500">{f.fat}g</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-purple-500">Carbs</p>
                  <p className="text-sm font-bold text-purple-500">
                    {f.carbs}g
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-pink-500">Sugar</p>
                  <p className="text-sm font-bold text-pink-500">{f.sugar}g</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 justify-between">
              <Button
                variant="outline"
                onClick={() => handleEdit({ foodId: f.id })}
              >
                Edit
              </Button>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">View More</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="">
                    <h4 className="text-sm font-semibold">Buy PREMIUM</h4>
                    <p className="text-sm">To get detalied nutrition values!</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Button
                variant="destructive"
                onClick={() => handleDelete({ foodId: f.id })}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
