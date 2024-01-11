import getFood from '@/actions/getFood';
import { DatePickerDemo } from '@/components/DatePicker';
import NutriProgress from '@/components/NutriProgress';
import getFoodEnergy from '@/actions/getFoodEnergy';
import { format, subDays } from 'date-fns';
import getFoodTargets from '@/actions/getFoodTargets';
import { BarChart } from '@/components/BarChart';
import { App } from '@/components/App';
import FoodCard from '@/components/FoodCard';
import Header from './Header';
import AddFood from './AddFood';
import { ProteinChart } from './ProteinChart';
import { FatChart } from './FatChart';
import { CarbsChart } from './CarbsChart';
import { SugarChart } from './SugarChart';
type CalDayProps = {
  params: {
    date: string;
  };
};

export const revalidate = 0;

export default async function CalDay({ params: { date } }: CalDayProps) {
  const currentDate = new Date();
  const today = new Date().toISOString().split('T')[0];
  const foods = await getFood({ date: date });
  const foodEnergy = await getFoodEnergy({ date: today });
  const [
    { calories_target, protein_target, carbs_target, fat_target, sugar_target },
  ] = await getFoodTargets();

  let totalEnergy = 0;
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
  let day1 = 0;
  let day2 = 0;
  let day3 = 0;
  let day4 = 0;
  let day5 = 0;
  let day6 = 0;
  let day7 = 0;
  let protein1 = 0;
  let protein2 = 0;
  let protein3 = 0;
  let protein4 = 0;
  let protein5 = 0;
  let protein6 = 0;
  let protein7 = 0;
  let fat1 = 0;
  let fat2 = 0;
  let fat3 = 0;
  let fat4 = 0;
  let fat5 = 0;
  let fat6 = 0;
  let fat7 = 0;
  let carbs1 = 0;
  let carbs2 = 0;
  let carbs3 = 0;
  let carbs4 = 0;
  let carbs5 = 0;
  let carbs6 = 0;
  let carbs7 = 0;
  let sugar1 = 0;
  let sugar2 = 0;
  let sugar3 = 0;
  let sugar4 = 0;
  let sugar5 = 0;
  let sugar6 = 0;
  let sugar7 = 0;
  return (
    <>
      {foods?.forEach((f: any) => {
        const { energy, portion, fat, protein, carbs, sugar } = f;
        totalEnergy += (energy * portion) / 100;
        totalFat += (fat * portion) / 100;
        totalProtein += (protein * portion) / 100;
        totalCarbs += (carbs * portion) / 100;
        totalSugar += (sugar * portion) / 100;
      })}
      {foodEnergy?.forEach((f: any) => {
        const { energy, protein, created_at, portion } = f;
        if (created_at == format(currentDate, 'yyyy-MM-dd')) {
          day1 += (energy * portion) / 100;
          protein1 += (protein * portion) / 100;
          fat1 += (protein * portion) / 100;
          carbs1 += (protein * portion) / 100;
          sugar1 += (protein * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 1), 'yyyy-MM-dd')) {
          day2 += (energy * portion) / 100;
          protein2 += (protein * portion) / 100;
          fat2 += (protein * portion) / 100;
          carbs2 += (protein * portion) / 100;
          sugar2 += (protein * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 2), 'yyyy-MM-dd')) {
          day3 += (energy * portion) / 100;
          protein3 += (protein * portion) / 100;
          fat3 += (protein * portion) / 100;
          carbs3 += (protein * portion) / 100;
          sugar3 += (protein * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 3), 'yyyy-MM-dd')) {
          day4 += (energy * portion) / 100;
          protein4 += (protein * portion) / 100;
          fat4 += (protein * portion) / 100;
          carbs4 += (protein * portion) / 100;
          sugar4 += (protein * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 4), 'yyyy-MM-dd')) {
          day5 += (energy * portion) / 100;
          protein5 += (protein * portion) / 100;
          fat5 += (protein * portion) / 100;
          carbs5 += (protein * portion) / 100;
          sugar5 += (protein * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 5), 'yyyy-MM-dd')) {
          day6 += (energy * portion) / 100;
          protein6 += (protein * portion) / 100;
          fat6 += (protein * portion) / 100;
          carbs6 += (protein * portion) / 100;
          sugar6 += (protein * portion) / 100;
        }
        if (created_at == format(subDays(currentDate, 6), 'yyyy-MM-dd')) {
          day7 += (energy * portion) / 100;
          protein7 += (protein * portion) / 100;
          fat7 += (protein * portion) / 100;
          carbs7 += (protein * portion) / 100;
          sugar7 += (protein * portion) / 100;
        }
      })}
      <Header>
        <div className="flex flex-col">
          <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
        </div>
      </Header>
      <div className="flex flex-col m-4">
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
            <BarChart
              day1={day1}
              day2={day2}
              day3={day3}
              day4={day4}
              day5={day5}
              day6={day6}
              day7={day7}
              caloriesTaget={calories_target}
            />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <ProteinChart
              protein1={protein1}
              protein2={protein2}
              protein3={protein3}
              protein4={protein4}
              protein5={protein5}
              protein6={protein6}
              protein7={protein7}
              proteinTarget={protein_target}
            />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <FatChart
              fat1={fat1}
              fat2={fat2}
              fat3={fat3}
              fat4={fat4}
              fat5={fat5}
              fat6={fat6}
              fat7={fat7}
              fatTarget={fat_target}
            />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <CarbsChart
              carbs1={carbs1}
              carbs2={carbs2}
              carbs3={carbs3}
              carbs4={carbs4}
              carbs5={carbs5}
              carbs6={carbs6}
              carbs7={carbs7}
              carbsTarget={carbs_target}
            />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <SugarChart
              sugar1={sugar1}
              sugar2={sugar2}
              sugar3={sugar3}
              sugar4={sugar4}
              sugar5={sugar5}
              sugar6={sugar6}
              sugar7={sugar7}
              sugarTarget={sugar_target}
            />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <App
              protein={totalProtein}
              carbs={totalCarbs}
              fat={totalFat}
              sugar={totalSugar}
            />
          </div>
        </div>
      </div>
    </>
  );
}
