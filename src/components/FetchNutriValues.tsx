'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Loading from '@/app/(site)/loading';
import { Input } from '@/componentsShadCn/ui/input';
import { Button } from '@/componentsShadCn/ui/button';
import { BiSearch } from 'react-icons/bi';
import SearchFood from '@/app/search/components/SearchFood';
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
  foodSearchCriteria: any; // Adjust the type as needed
  foods: foods[]; // Adjust the type as needed
  aggregations: any[]; // Adjust the type as needed
}

const FetchNutriValues: React.FC = () => {
  const [data, setData] = useState<FoodData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(); // Default query
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=ZXncLTW53E18uucYcJUTYULmteiaQ5lSYVYYZfr9&query=${query}`
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
  const allowedNutrients = [
    'Protein',
    'Carbohydrate',
    'Total lipid (fat)',
    'Fatty acids, total polyunsaturated',
    'Fatty acids, total monounsaturated',
    'Fat',
    'Energy',
    'Fiber',
    'Carbohydrate, by difference',
    'Sugars, total including NLEA',
    'Sugars',
    'Fiber, total dietary',
  ];
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFetchClick = () => {
    fetchData();
  };
  return (
    <div className="bg-neutral-300 dark:bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="mb-2 flex flex-col gap-y-6">
        <Header>
          <div className="mb-2 flex flex-col gap-y-6">
            <h1 className="text-white text-3xl font-semibold">Search</h1>
          </div>
        </Header>
        {error && <p>Error: {error}</p>}
        <div className="flex flex-col gap-y-2 w-full px-6">
          <div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <Input
                  type="text"
                  placeholder="Search for food with USDA"
                  onChange={handleQueryChange}
                  className="w-60 mr-4"
                />
                <Button type="submit" onClick={handleFetchClick}>
                  <BiSearch size={22} />
                  Search
                </Button>
              </div>
              <SearchFood />
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            data &&
            data.foods.length > 0 && (
              <div className="flex flex-col w-full">
                {data.foods.map((food) => (
                  <div
                    className="flex flex-col border-2 rounded-lg p-2 m-2"
                    key={food.fdcId}
                  >
                    <div className="flex flex-row justify-between">
                      <div>
                        <h3>Description: {food.description}</h3>
                        <p>Category: {food.foodCategory}</p>
                      </div>
                      <Button className="w-12">Add</Button>
                    </div>
                    <ul className="flex flex-wrap">
                      {food.foodNutrients
                        .filter((nutrient) => nutrient.value !== 0)
                        .filter((nutrient) =>
                          allowedNutrients.includes(nutrient.nutrientName)
                        )
                        .map((nutrient) => (
                          <li
                            className="border-2 m-1 p-1 rounded-lg"
                            key={nutrient.nutrientId}
                          >
                            <strong>{nutrient.nutrientName}:</strong>{' '}
                            <p>{nutrient.value}</p> <p> {nutrient.unitName}</p>
                          </li>
                        ))}
                    </ul>
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
