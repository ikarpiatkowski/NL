import {
  HiClipboardCheck,
  HiClipboardList,
  HiIdentification,
} from 'react-icons/hi';

import getSongs from '@/actions/getSongs';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from '@/components/PageContent';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div
      className=" 
      bg-neutral-100
    dark:bg-neutral-900 
      rounded-lg 
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto"
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
            text-black
            dark:text-white 
              text-3xl 
              font-semibold
            "
          >
            Welcome again!
          </h1>
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            "
          >
            <ListItem
              name="Favorite food"
              image="/images/favfood.png"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <section className="w-full my-8">
        <div className="container space-y-6 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why use our app?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                Our app is designed with your health in mind. Easy to use and
                efficient, it&apos;s the perfect tool to help you maintain a
                balanced diet.
              </p>
            </div>
            <div className="inline-block font-bold rounded-lg bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800">
              Features
            </div>
          </div>
          <div className="mx-auto grid items-start sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="flex text-lg font-bold items-center justify-center pb-2">
                <HiClipboardCheck />
                Easy Tracking
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Quickly add meals and snacks you&apos;ve had throughout the day.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="flex text-lg font-bold items-center justify-center pb-2">
                <HiClipboardList />
                Nutritional Information
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Get detailed information about your consumption of calories,
                proteins, carbs and fats.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="flex text-lg font-bold items-center justify-center pb-2">
                <HiIdentification />
                Customized Goals
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Set your personal goals and track your progress over time.
              </p>
            </div>
          </div>
          <h2 className="font-bold rounded-lg bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800 text-center">
            Custom foods from our users
          </h2>
        </div>
      </section>
      <PageContent songs={songs} />
    </div>
  );
}
