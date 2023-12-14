import getFood from '@/actions/getFood';
import Header from '@/components/Header';
import { DatePickerDemo } from '@/components/DatePicker';
import NutriProgress from '@/components/NutriProgress';
import FoodCard from '../components/FoodCard';
import { Polar } from '../components/Polar';
import { App } from '../components/App';
import BarChart from '../components/BarChart';
type CalDayProps = {
  params: {
    date: string;
  };
};
export default async function CalDay({ params: { date } }: CalDayProps) {
  const foods = await getFood({ date: date });
  let totalEnergy = 0;
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
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
        {foods?.forEach((f: any) => {
          totalEnergy += f.energy;
          totalFat += f.fat;
          totalProtein += f.protein;
          totalCarbs += f.carbs;
          totalSugar += f.sugar;
        })}
        <div className="flex flex-col m-4">
          <div className="flex justify-center">
            <DatePickerDemo />
          </div>
          <div className="flex justify-center m-4">
            <div className="flex flex-col p-2 text-center">
              Energy {totalEnergy}/2000
              <NutriProgress
                value={Math.min(
                  100,
                  parseFloat(((totalEnergy / 2000) * 100).toFixed(0))
                )}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Fat {totalFat}/60
              <NutriProgress
                value={Math.min(
                  100,
                  parseFloat(((totalFat / 60) * 100).toFixed(0))
                )}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Protein {totalProtein}/120
              <NutriProgress
                value={Math.min(
                  100,
                  parseFloat(((totalProtein / 120) * 100).toFixed(0))
                )}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Carbs {totalCarbs}/90
              <NutriProgress
                value={Math.min(
                  100,
                  parseFloat(((totalCarbs / 90) * 100).toFixed(0))
                )}
              />
            </div>
            <div className="flex flex-col p-2 text-center">
              Sugar {totalSugar}/60
              <NutriProgress
                value={Math.min(
                  100,
                  parseFloat(((totalSugar / 60) * 100).toFixed(0))
                )}
              />
            </div>
          </div>
          <div className="flex">
            <FoodCard foodData={foods} />
            {/* <FetchFood /> */}
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
}
