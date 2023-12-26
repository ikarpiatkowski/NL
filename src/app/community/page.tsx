import getSongsByTitle from '@/actions/getSongsByTitle';
import SearchInput from '@/components/SearchInput';
import Header from '@/components/Header';
import SearchContent from '@/components/SearchContent';

interface SearchProps {
  searchParams: { title: string };
}

export const revalidate = 0;

const Community = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
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
        <div className="flex flex-col">
          <h1 className="text-white text-3xl font-semibold pb-4">
            Community food
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Community;
