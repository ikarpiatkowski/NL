import getFood from '@/actions/getFood';
import { DatePickerDemo } from '@/components/DatePicker';
import NutriProgress from '@/components/NutriProgress';
import getFoodEnergy from '@/actions/getFoodEnergy';
import { format, subDays } from 'date-fns';
import getFoodTargets from '@/actions/getFoodTargets';
import { BarChart } from '@/components/BarChart';
import { DoughnutChart } from '@/components/DoughnutChart';
import FoodCard from '@/components/FoodCard';
import Header from './Header';
import AddFood from './AddFood';
import { ProteinChart } from './ProteinChart';
import { FatChart } from './FatChart';
import { CarbsChart } from './CarbsChart';
import { SugarChart } from './SugarChart';
import { MainChart } from './MainChart';
import getCalories from '@/actions/getCalories';
import { CustomChart } from './CustomChart';

type CalDayProps = {
  params: {
    date: string;
  };
};

export const revalidate = 0;

export default async function CalDay({ params: { date } }: CalDayProps) {
  const currentDate = new Date();
  const foods = await getFood({ date: date });
  const foodEnergy = await getFoodEnergy();
  const foodCalories = await getCalories();
  const [
    { calories_target, protein_target, carbs_target, fat_target, sugar_target },
  ] = await getFoodTargets();

  let totalEnergy = 0;
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
  const days = {
    day1: 0,
    day2: 0,
    day3: 0,
    day4: 0,
    day5: 0,
    day6: 0,
    day7: 0,
  };
  const proteins = {
    protein1: 0,
    protein2: 0,
    protein3: 0,
    protein4: 0,
    protein5: 0,
    protein6: 0,
    protein7: 0,
  };
  const fats = {
    fat1: 0,
    fat2: 0,
    fat3: 0,
    fat4: 0,
    fat5: 0,
    fat6: 0,
    fat7: 0,
  };
  const carbs = {
    carb1: 0,
    carb2: 0,
    carb3: 0,
    carb4: 0,
    carb5: 0,
    carb6: 0,
    carb7: 0,
  };
  const sugars = {
    sugar1: 0,
    sugar2: 0,
    sugar3: 0,
    sugar4: 0,
    sugar5: 0,
    sugar6: 0,
    sugar7: 0,
  };

  return (
    <>
      {foods?.forEach((f: any) => {
        const { energy, portion, protein, fat, carb, sugar } = f;
        totalEnergy += (energy * portion) / 100;
        totalProtein += (protein * portion) / 100;
        totalFat += (fat * portion) / 100;
        totalCarbs += (carb * portion) / 100;
        totalSugar += (sugar * portion) / 100;
      })}
      {foodEnergy?.forEach((f: any) => {
        const { energy, protein, fat, carb, sugar, created_at, portion } = f;
        if (created_at == format(currentDate, 'yyyy-MM-dd')) {
          days.day1 += (energy * portion) / 100;
          proteins.protein1 += (protein * portion) / 100;
          fats.fat1 += (fat * portion) / 100;
          carbs.carb1 += (carb * portion) / 100;
          sugars.sugar1 += (sugar * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 1), 'yyyy-MM-dd')) {
          days.day2 += (energy * portion) / 100;
          proteins.protein2 += (protein * portion) / 100;
          fats.fat2 += (fat * portion) / 100;
          carbs.carb2 += (carb * portion) / 100;
          sugars.sugar2 += (sugar * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 2), 'yyyy-MM-dd')) {
          days.day3 += (energy * portion) / 100;
          proteins.protein3 += (protein * portion) / 100;
          fats.fat3 += (fat * portion) / 100;
          carbs.carb3 += (carb * portion) / 100;
          sugars.sugar3 += (sugar * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 3), 'yyyy-MM-dd')) {
          days.day4 += (energy * portion) / 100;
          proteins.protein4 += (protein * portion) / 100;
          fats.fat4 += (fat * portion) / 100;
          carbs.carb4 += (carb * portion) / 100;
          sugars.sugar4 += (sugar * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 4), 'yyyy-MM-dd')) {
          days.day5 += (energy * portion) / 100;
          proteins.protein5 += (protein * portion) / 100;
          fats.fat5 += (fat * portion) / 100;
          carbs.carb5 += (carb * portion) / 100;
          sugars.sugar5 += (sugar * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 5), 'yyyy-MM-dd')) {
          days.day6 += (energy * portion) / 100;
          proteins.protein6 += (protein * portion) / 100;
          fats.fat6 += (fat * portion) / 100;
          carbs.carb6 += (carb * portion) / 100;
          sugars.sugar6 += (sugar * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 6), 'yyyy-MM-dd')) {
          days.day7 += (energy * portion) / 100;
          proteins.protein7 += (protein * portion) / 100;
          fats.fat7 += (fat * portion) / 100;
          carbs.carb7 += (carb * portion) / 100;
          sugars.sugar7 += (sugar * portion) / 100;
        }
      })}
      <Header>
        <div className="flex flex-col">
          <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
        </div>
      </Header>
      <div className="flex flex-col m-4">
        <MainChart calories={foodCalories} />
        <CustomChart calories={foodCalories} />
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <AddFood />
            <DatePickerDemo />
          </div>
        </div>
        <div className="flex justify-center m-4 flex-wrap">
          <div className="flex flex-col p-2 text-center">
            <div className="w-full flex justify-between">
              <p className="text-yellow-400 font-bold">
                Calories{' '}
                {parseFloat(((totalEnergy / calories_target) * 100).toFixed(0))}
                %
              </p>
              <p className="text-yellow-400 font-bold">
                {totalEnergy.toFixed(0)} / {calories_target}kcal
              </p>
            </div>
            <NutriProgress
              color="bg-yellow-400"
              value={Math.min(
                100,
                parseFloat(((totalEnergy / calories_target) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            <div className="w-full flex justify-between">
              <p className="text-green-500 font-bold">
                Protein{' '}
                {parseFloat(((totalProtein / protein_target) * 100).toFixed(0))}
                %
              </p>
              <p className="text-green-500 font-bold">
                {totalProtein.toFixed(1)}g / {protein_target}g
              </p>
            </div>
            <NutriProgress
              color="bg-green-500"
              value={Math.min(
                100,
                parseFloat(((totalProtein / protein_target) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            <div className="w-full flex justify-between">
              <p className="text-red-500 font-bold">
                Fat {parseFloat(((totalFat / fat_target) * 100).toFixed(0))}%
              </p>
              <p className="text-red-500 font-bold">
                {totalFat.toFixed(1)}g / {fat_target}g
              </p>
            </div>
            <NutriProgress
              color="bg-red-500"
              value={Math.min(
                100,
                parseFloat(((totalFat / fat_target) * 100).toFixed(0))
              )}
            />
          </div>

          <div className="flex flex-col p-2 text-center">
            <div className="w-full flex justify-between">
              <p className="text-purple-500 font-bold">
                Carbs{' '}
                {parseFloat(((totalCarbs / carbs_target) * 100).toFixed(0))}%
              </p>
              <p className="text-purple-500 font-bold">
                {totalCarbs.toFixed(1)}g / {carbs_target}g
              </p>
            </div>
            <NutriProgress
              color="bg-purple-500"
              value={Math.min(
                100,
                parseFloat(((totalCarbs / carbs_target) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            <div className="w-full flex justify-between">
              <p className="text-pink-500 font-bold">
                Sugar{' '}
                {parseFloat(((totalSugar / sugar_target) * 100).toFixed(0))}%
              </p>
              <p className="text-pink-500 font-bold">
                {totalSugar.toFixed(1)}g / {sugar_target}g
              </p>
            </div>
            <NutriProgress
              color="bg-pink-500"
              value={Math.min(
                100,
                parseFloat(((totalSugar / sugar_target) * 100).toFixed(0))
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <FoodCard foodData={foods} />
        </div>
        <div className="flex mt-10 justify-center flex-wrap">
          <div className="flex w-[600px] h-[400px] justify-center">
            <BarChart days={days} caloriesTaget={calories_target} />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <ProteinChart proteins={proteins} proteinTarget={protein_target} />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <FatChart fats={fats} fatTarget={fat_target} />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <CarbsChart carbs={carbs} carbsTarget={carbs_target} />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <SugarChart sugars={sugars} sugarTarget={sugar_target} />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <DoughnutChart
              protein={totalProtein}
              carb={totalCarbs}
              fat={totalFat}
              sugar={totalSugar}
            />
          </div>
        </div>
      </div>
    </>
  );
}
