import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
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
const FetchFood = async ({ foodData, date, id }: any) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }
  let { data: userFood, error } = await supabaseAdmin
    .from('userFood')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .eq('created_at', '2023-12-12');
  return (
    <>
      {userFood?.map((f: any) => (
        <div key={f.id}>
          <Card className="bg-white shadow rounded-xl overflow-hidden w-fit m-2">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold">{f.name}</CardTitle>
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
            <CardFooter className="p-2">
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
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
};

export default FetchFood;
