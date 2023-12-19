import Header from '@/components/Header';
import FoodFetch from './components/FoodFetch';
export const revalidate = 0;
const Dashboard = async () => {
  return (
    <>
      <div
        className="
        bg-violet-200
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
        <FoodFetch />
      </div>
    </>
  );
};

export default Dashboard;
