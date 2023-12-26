import Header from '@/components/Header';
import CalDay from '../components/CalDay';
export const revalidate = 0;
const today = new Date().toISOString().split('T')[0];
type CalDayProps = {
  params: {
    date: string;
  };
};
const Dashboard = async ({ params: { date } }: CalDayProps) => {
  return (
    <>
      <div
        className="
        bg-neutral-200
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
        <CalDay params={{ date: date }} />
      </div>
    </>
  );
};

export default Dashboard;
