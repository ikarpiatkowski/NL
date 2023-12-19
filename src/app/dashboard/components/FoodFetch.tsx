import NutriProgress from '@/components/NutriProgress';
import FoodCard from './FoodCard';
import BarChart from './BarChart';
import { Polar } from './Polar';
import { App } from './App';
import { DatePickerDemo } from '@/components/DatePicker';
import getFood from '@/actions/getFood';
import getFoodEnergy from '@/actions/getFoodEnergy';
import { format, subDays } from 'date-fns';

const FoodFetch = async () => {
  let totalEnergy = 0;
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
  let totalEnergyFromPreviousDays = 0;
  let day1 = 0;
  let day2 = 0;
  let day3 = 0;
  let day4 = 0;
  let day5 = 0;
  let day6 = 0;
  let day7 = 0;
  const splitDateUrl = new Date().toISOString().split('T')[0];
  const foods = await getFood({ date: splitDateUrl });
  const foodEnergy = await getFoodEnergy({ date: splitDateUrl });
  const totalEnergyMap = new Map<string, number>();
  const currentDate = new Date();
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
        totalEnergyFromPreviousDays += f.energy;
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
        const formattedDate = new Date(created_at).toISOString().split('T')[0];
        totalEnergyMap.set(
          formattedDate,
          (totalEnergyMap.get(formattedDate) || 0) + energy
        );
      })}
      <div className="flex flex-col m-4">
        <div className="flex justify-center">
          <DatePickerDemo />
        </div>
        <div className="flex justify-center m-4 flex-wrap">
          <div className="flex flex-col p-2 text-center">
            Energy {totalEnergy.toFixed(0)}/2000
            <NutriProgress
              value={Math.min(
                100,
                parseFloat(((totalEnergy / 2000) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            Fat {totalFat.toFixed(0)}/60
            <NutriProgress
              value={Math.min(
                100,
                parseFloat(((totalFat / 60) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            Protein {totalProtein.toFixed(0)}/120
            <NutriProgress
              value={Math.min(
                100,
                parseFloat(((totalProtein / 120) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            Carbs {totalCarbs.toFixed(0)}/90
            <NutriProgress
              value={Math.min(
                100,
                parseFloat(((totalCarbs / 90) * 100).toFixed(0))
              )}
            />
          </div>
          <div className="flex flex-col p-2 text-center">
            Sugar {totalSugar.toFixed(0)}/60
            <NutriProgress
              value={Math.min(
                100,
                parseFloat(((totalSugar / 60) * 100).toFixed(0))
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <FoodCard foodData={foods} />
          {/* <FetchFood /> */}
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
            />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <Polar />
          </div>
          <div className="flex w-[600px] h-[400px] justify-center">
            <App />
          </div>
        </div>
      </div>
    </>
  );
};
export default FoodFetch;
