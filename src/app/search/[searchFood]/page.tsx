import Header from '@/components/Header';
import Search from '../components/SearchFood';
import SearchNinja from '../components/SearchNinja';
export const metadata = {
  title: 'Nourish Log - Search food',
};
type SearchPageProps = {
  params: {
    searchFood: string;
  };
};
export default function SearchFoodPage({
  params: { searchFood },
}: SearchPageProps) {
  return (
    <>
      <div
        className="flex flex-row flex-wrap justify-center w-full h-full bg-violet-200
        dark:bg-neutral-900 "
      >
        <Search />
        <SearchNinja params={{ searchFood }} />
      </div>
    </>
  );
}
