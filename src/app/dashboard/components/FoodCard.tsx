'use client';
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
import toast from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import useEditModal from '@/hooks/useEditModal';
export default function FoodCard({ foodData }: any) {
  const router = useRouter();
  const editModal = useEditModal();
  const { setFoodId } = editModal;
  const supabaseClient = useSupabaseClient();
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
  // console.log(foodId);
  return (
    <>
      {foodData?.map((f: any) => (
        <div key={f.id}>
          <Card className="bg-white shadow rounded-xl overflow-hidden w-fit m-2">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold w-60">{f.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Serving Size 100g
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pt-2">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <p className="text-sm">Calories</p>
                  <p className="text-sm">{f.energy}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Protein</p>
                  <p className="text-sm">{f.protein}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Fat</p>
                  <p className="text-sm">{f.fat}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Carbs</p>
                  <p className="text-sm">{f.carbs}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Sugar</p>
                  <p className="text-sm">{f.sugar}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 justify-between">
              <Button
                className="text-blue-500"
                variant="outline"
                onClick={() => handleEdit({ foodId: f.id })}
              >
                Edit
              </Button>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button className="text-blue-500" variant="link">
                    View More
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="">
                    <h4 className="text-sm font-semibold">Buy PREMIUM</h4>
                    <p className="text-sm">To get detalied nutrition values!</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Button
                className="text-blue-500"
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
