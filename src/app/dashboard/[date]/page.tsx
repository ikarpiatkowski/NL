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
        <CalDay params={{ date: date }} />
      </div>
    </>
  );
};

export default Dashboard;
