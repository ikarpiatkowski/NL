import Header from '@/components/Header';
import { supabaseAdmin } from '@/libs/supabaseAdmin';
import BarChart from './components/BarChart';
import { Polar } from './components/Polar';
import NutriProgress from '@/components/NutriProgress';
import { DatePickerDemo } from '@/components/DatePicker';
import FoodCard from './components/FoodCard';
import { App } from './components/App';
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

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }
  let { data: userFood, error } = await supabaseAdmin
    .from('userFood')
    .select('*')
    .eq('user_id', sessionData.session?.user.id);
  let totalEnergy = 0;
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
  return (
    <>
      {userFood?.forEach((f: any) => {
        totalEnergy += f.energy;
        totalFat += f.fat;
        totalProtein += f.protein;
        totalCarbs += f.carbs;
        totalSugar += f.sugar;
      })}
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
        <div className="flex flex-col m-4">
          <div className="flex justify-center">
            <DatePickerDemo />
          </div>
          <div className="flex justify-center m-4">
            <div className="flex flex-col p-2 text-center">
              Energy {totalEnergy}/2000
              <NutriProgress
                value={parseFloat(((totalEnergy / 2000) * 100).toFixed(0))}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Fat {totalFat}/60
              <NutriProgress
                value={parseFloat(((totalFat / 60) * 100).toFixed(0))}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Protein {totalProtein}/120
              <NutriProgress
                value={parseFloat(((totalProtein / 120) * 100).toFixed(0))}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Carbs {totalCarbs}/90
              <NutriProgress
                value={parseFloat(((totalCarbs / 90) * 100).toFixed(0))}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Sugar {totalSugar}/60
              <NutriProgress
                value={parseFloat(((totalSugar / 60) * 100).toFixed(0))}
              />
            </div>
          </div>
          <div className="flex">
            <FoodCard foodData={userFood} />
          </div>
          <div className="flex mt-10 justify-center">
            <div className="flex w-[600px] h-[400px]">
              <BarChart energy={totalEnergy} />
            </div>
            <div className="flex w-[600px] h-[400px]">
              <Polar />
            </div>
            <div className="flex w-[600px] h-[400px]">
              <App />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
