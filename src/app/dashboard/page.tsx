import Header from '@/components/Header';
import { supabaseAdmin } from '@/libs/supabaseAdmin';
import BarChart from './components/BarChart';
import { Polar } from './components/Polar';
import NutriProgress from '@/components/NutriProgress';
import { DatePickerDemo } from '@/components/DatePicker';
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
  const { data } = await supabaseAdmin
    .from('userFood')
    .select('food')
    .eq('user_id', 'd972799c-4d23-4c47-947c-c48da61ee28e')
    .eq('created_at', '2023-11-30 00:03:38.777005+00');
  return (
    <>
      {data?.map((i: any) => (
        <div key={i.fdcId}>{i.foodClass}</div>
      ))}
      {data!.map((foodData) => {
        <div
          key={foodData.food.fdcId}
          className="rounded-3xl bg-neutral-300 dark:bg-neutral-600 m-4 p-2 w-64"
        >
          <p className="rounded-3xl bg-neutral-400 dark:bg-neutral-700 font-bold text-center capitalize">
            {foodData.food.fdcId} 🧧
          </p>
          <p>🍕 Calories: {foodData.food[0]}</p>
        </div>;
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
              Calories (Energy) 77%
              <NutriProgress value={77} />
            </div>
            <div className="flex flex-col p-2 text-center">
              Protein 49%
              <NutriProgress value={49} />
            </div>
            <div className="flex flex-col p-2 text-center">
              Carbs 27%
              <NutriProgress value={27} />
            </div>
            <div className="flex flex-col p-2 text-center">
              Fat 93%
              <NutriProgress value={93} />
            </div>
          </div>
          <div className="flex mt-10 justify-center">
            <div className="flex w-[600px] h-[400px]">
              <BarChart />
            </div>
            <div className="flex w-[600px] h-[400px]">
              <Polar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
