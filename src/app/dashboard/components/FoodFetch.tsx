import NutriProgress from '@/components/NutriProgress';
import { supabaseAdmin } from '@/libs/supabaseAdmin';
import FoodCard from './FoodCard';
import FetchFood from '@/components/FetchFood';
import BarChart from './BarChart';
import { Polar } from './Polar';
import { App } from './App';
import { DatePickerDemo } from '@/components/DatePicker';
import getFood from '@/actions/getFood';

const FoodFetch = async ({ userId }: any) => {
  //   let { data: userFood, error } = await supabaseAdmin
  //     .from('userFood')
  //     .select('*')
  //     .eq('user_id', userId)
  //     .eq('created_at', '2023-12-12');
  let totalEnergy = 0;
  let totalFat = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalSugar = 0;
  const splitDateUrl = new Date().toISOString().split('T')[0];
  const foods = await getFood({ date: splitDateUrl });
  // console.log(foods);
  return (
    <>
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
    </>
  );
};
export default FoodFetch;
