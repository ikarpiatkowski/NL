import getFood from '@/actions/getFood';
import { DatePickerDemo } from '@/components/DatePicker';
import NutriProgress from '@/components/NutriProgress';
import getFoodEnergy from '@/actions/getFoodEnergy';
import { format, subDays } from 'date-fns';
import getFoodTargets from '@/actions/getFoodTargets';
import { BarChart } from '@/components/BarChart';
import { App } from '@/components/App';
import FoodCard from '@/components/FoodCard';

type CalDayProps = {
  params: {
    date: string;
  };
};

export const revalidate = 0;

export default async function CalDay({ params: { date } }: CalDayProps) {
  const foods = await getFood({ date: date });
  const today = new Date().toISOString().split('T')[0];
  const foodEnergy = await getFoodEnergy({ date: today });
  const currentDate = new Date();
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
  return (
    <>
      {foods?.forEach((f: any) => {
        totalEnergy += f.energy;
        totalFat += f.fat;
        totalProtein += f.protein;
        totalCarbs += f.carbs;
        totalSugar += f.sugar;
      })}
      {foodEnergy?.forEach((f: any) => {
        const { energy, created_at } = f;
        if (created_at == format(currentDate, 'yyyy-MM-dd')) {
          day1 += f.energy;
        }
        if (created_at == format(subDays(currentDate, 1), 'yyyy-MM-dd')) {
          day2 += f.energy;
        }
        if (created_at == format(subDays(currentDate, 2), 'yyyy-MM-dd')) {
          day3 += f.energy;
        }
        if (created_at == format(subDays(currentDate, 3), 'yyyy-MM-dd')) {
          day4 += f.energy;
        }
        if (created_at == format(subDays(currentDate, 4), 'yyyy-MM-dd')) {
          day5 += f.energy;
        }
        if (created_at == format(subDays(currentDate, 5), 'yyyy-MM-dd')) {
          day6 += f.energy;
        }
        if (created_at == format(subDays(currentDate, 6), 'yyyy-MM-dd')) {
          day7 += f.energy;
        }
      })}
      <div className="flex flex-col m-4">
        <div className="flex justify-center">
          <DatePickerDemo />
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
