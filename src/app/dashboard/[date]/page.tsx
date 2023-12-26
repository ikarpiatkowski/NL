import CalDay from '@/components/CalDay';
import Header from '@/components/Header';
export const revalidate = 0;
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
        bg-neutral-100
        dark:bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
      >
        <Header>
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
