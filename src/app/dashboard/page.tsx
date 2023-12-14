import Header from '@/components/Header';
import FoodFetch from './components/FoodFetch';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string };
}
interface Nutrient {
  id: number;
  number: string;
  name: string;
  rank: number;
  unitName: string;
}

interface FoodNutrient {
  type: string;
  id: number;
  nutrient: Nutrient;
  amount: number;
}

interface FoodAttributeType {
  id: number;
  name: string;
  description: string;
}

interface FoodAttribute {
  id: number;
  name: string;
  value: string;
  foodAttributeType: FoodAttributeType;
}

interface MeasureUnit {
  id: number;
  name: string;
  abbreviation: string;
}

interface FoodPortion {
  id: number;
  measureUnit: MeasureUnit;
  modifier: string;
  gramWeight: number;
  portionDescription: string;
  sequenceNumber: number;
}

interface WWEIAFoodCategory {
  wweiaFoodCategoryDescription: string;
  wweiaFoodCategoryCode: number;
}

interface InputFood {
  id: number;
  unit: string;
  portionDescription: string;
  portionCode: string;
  foodDescription: string;
  ingredientWeight: number;
  ingredientCode: number;
  ingredientDescription: string;
  amount: number;
  sequenceNumber: number;
}

interface FoodData {
  foodClass: string;
  description: string;
  foodNutrients: FoodNutrient[];
  foodAttributes: FoodAttribute[];
  foodCode: string;
  startDate: string;
  endDate: string;
  wweiaFoodCategory: WWEIAFoodCategory;
  foodPortions: FoodPortion[];
  publicationDate: string;
  inputFoods: InputFood[];
  dataType: string;
  fdcId: number;
}
const Dashboard = async ({ searchParams }: SearchProps) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  return (
    <>
      <div
        className="
      bg-neutral-300 
        dark:bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
      >
        <Header className="bg-from-neutral-900">
          <div className="mb-2 flex flex-col gap-y-6">
            <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
          </div>
        </Header>
        <FoodFetch userId={sessionData.session?.user.id} />
      </div>
    </>
  );
};

export default Dashboard;
