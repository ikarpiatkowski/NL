'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import Header from '@/components/Header';
import Loading from '@/app/(site)/loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BiSearch } from 'react-icons/bi';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from '@/components/ui/hover-card';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface foods {
  fdcId: number;
  description: string;
  dataType: string;
  gtinUpc: string;
  publishedDate: string;
  brandOwner: string;
  brandName: string;
  ingredients: string;
  marketCountry: string;
  foodCategory: string;
  modifiedDate: string;
  dataSource: string;
  packageWeight: string;
  servingSizeUnit: string;
  servingSize: number;
  tradeChannels: string[];
  allHighlightFields: string;
  score: number;
  microbes: any[];
  foodNutrients: {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
    derivationId: number;
    value: number;
    foodNutrientSourceId: number;
    foodNutrientSourceCode: string;
    foodNutrientSourceDescription: string;
    rank: number;
    indentLevel: number;
    foodNutrientId: number;
    percentDailyValue?: number;
  }[];
  finalFoodInputFoods: any[];
  foodMeasures: any[];
  foodAttributes: any[];
  foodAttributeTypes: any[];
  foodVersionIds: any[];
}

interface FoodData {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageList: number[];
  foodSearchCriteria: any;
  foods: foods[];
  aggregations: any[];
}
interface FetchNutriValuesProps {
  userId: string;
  apiKey: string;
}
const FetchNutriValues: React.FC<FetchNutriValuesProps> = ({
  userId,
  apiKey,
}) => {
  const [data, setData] = useState<FoodData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();

  const supabaseClient = useSupabaseClient();

  const idNutrients = [2000, 1005, 1000, 1003, 1004, 1008];

  const nutrientOrder = [
    'Energy',
    'Protein',
    'Total lipid (fat)',
    'Carbohydrate, by difference',
    'Sugars, total including NLEA',
    'Total Sugars',
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await res.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const addFood = async ({ energy, protein, fat, carb, sugar, name }: any) => {
    const { error: supabaseError } = await supabaseClient
      .from('userFood')
      .insert({
        energy: energy,
        protein: protein,
        fat: fat,
        carb: carb,
        sugar: sugar,
        name: name,
        user_id: userId,
      });

    if (supabaseError) {
      return toast.error(supabaseError.message);
    } else {
      toast.success('Food added successfully');
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="mb-2 flex flex-col gap-y-6">
        <Header>
          <div className="mb-2 flex flex-col gap-y-6">
            <h1 className="text-white text-3xl font-semibold">Search</h1>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center"></div>
            </div>
          </div>
        </Header>
        {error && <p>Error: {error}</p>}
        <div className="flex flex-col items-center gap-y-2 w-full px-6">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search for food with USDA"
              onChange={handleQueryChange}
              className="w-60 mr-4"
            />
            <Button type="submit" onClick={fetchData}>
              <BiSearch size={22} />
              Search
            </Button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            data &&
            data.foods.length > 0 && (
              <div className="flex flex-wrap justify-center">
                {data.foods.map((food) => (
                  <div key={food.fdcId}>
                    <Card className="bg-white shadow rounded-xl overflow-hidden w-fit m-2">
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg font-bold w-60 truncate">
                          {food.description}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          Serving per 100g
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-4">
                        <div className="grid gap-2">
                          {food.foodNutrients
                            .filter((nutrient) =>
                              idNutrients.includes(nutrient.nutrientId)
                            )
                            .sort(
                              (a, b) =>
                                nutrientOrder.indexOf(a.nutrientName) -
                                nutrientOrder.indexOf(b.nutrientName)
                            )
                            .map((nutrient) => (
                              <div
                                key={nutrient.nutrientId}
                                className="flex justify-between"
                              >
                                <p
                                  className={`text-sm font-bold ${getTextColorByNutrientId(
                                    nutrient.nutrientId
                                  )}`}
                                >
                                  {getShortenedNutrientName(
                                    nutrient.nutrientName
                                  )}
                                </p>
                                <p
                                  className={`text-sm font-bold ${getTextColorByNutrientId(
                                    nutrient.nutrientId
                                  )}`}
                                >
                                  {Number.isInteger(nutrient.value)
                                    ? nutrient.value
                                    : nutrient.value.toFixed(1)}
                                  <span>
                                    {nutrient.unitName === 'KCAL'
                                      ? ` ${nutrient.unitName.toLowerCase()}`
                                      : nutrient.unitName.toLowerCase()}
                                  </span>
                                </p>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                      <CardFooter className="px-4 flex justify-between">
                        <Button
                          onClick={() => {
                            addFood({
                              protein: food.foodNutrients.find(
                                (nutrient) => nutrient.nutrientId === 1003
                              )?.value,
                              energy: food.foodNutrients.find(
                                (nutrient) => nutrient.nutrientId === 1008
                              )?.value,
                              fat: food.foodNutrients.find(
                                (nutrient) => nutrient.nutrientId === 1004
                              )?.value,
                              sugar: food.foodNutrients.find(
                                (nutrient) => nutrient.nutrientId === 2000
                              )?.value,
                              carb: food.foodNutrients.find(
                                (nutrient) => nutrient.nutrientId === 1005
                              )?.value,
                              name: food.description,
                            });
                          }}
                          className="w-12"
                        >
                          Add
                        </Button>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button className="text-blue-500" variant="link">
                              View More
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <h4 className="text-center text-sm font-semibold pb-2">
                              Detailed Nutrition Facts
                            </h4>
                            <h3 className="text-sm font-bold pb-2">
                              Name: {food.description}
                            </h3>
                            <div className="text-sm">
                              {food.foodNutrients
                                .filter((nutrient) => nutrient.value !== 0)
                                .map((nutrient) => (
                                  <div
                                    key={nutrient.nutrientId}
                                    className="flex justify-between"
                                  >
                                    <p className="text-sm">
                                      {nutrient.nutrientName}
                                    </p>
                                    <p className="text-sm">
                                      {Number.isInteger(nutrient.value)
                                        ? nutrient.value
                                        : nutrient.value.toFixed(1)}
                                      <span>
                                        {nutrient.unitName === 'KCAL'
                                          ? ` ${nutrient.unitName.toLowerCase()}`
                                          : nutrient.unitName.toLowerCase()}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchNutriValues;
function getTextColorByNutrientId(nutrientId: number): string {
  switch (nutrientId) {
    case 1005: // Carbs
      return 'text-purple-500';
    case 1000: // Total lipid (fat)
      return 'text-blue-500';
    case 1003: // Protein
      return 'text-green-500';
    case 1004: // Fat
      return 'text-red-500';
    case 2000: // Sugars
      return 'text-pink-500';
    case 1008: // Calories
      return 'text-yellow-500';
    default:
      return '';
  }
}

function getShortenedNutrientName(nutrientName: string): string {
  switch (nutrientName) {
    case 'Total lipid (fat)':
      return 'Fat';
    case 'Carbohydrate, by difference':
      return 'Carbs';
    case 'Sugars, total including NLEA':
    case 'Total Sugars':
      return 'Sugar!';
    default:
      return nutrientName;
  }
}
