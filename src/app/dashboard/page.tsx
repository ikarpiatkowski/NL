import CalDay from '@/components/CalDay';
export const revalidate = 0;
const today = new Date().toISOString().split('T')[0];
const Dashboard = async () => {
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
        <CalDay params={{ date: today }} />
      </div>
    </>
  );
};

export default Dashboard;
