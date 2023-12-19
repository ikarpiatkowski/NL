'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Loading from '@/app/(site)/loading';
import { Input } from '@/componentsShadCn/ui/input';
import { Button } from '@/componentsShadCn/ui/button';
import { BiSearch } from 'react-icons/bi';
import SearchFood from '@/app/search/components/SearchFood';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/componentsShadCn/ui/card';
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from '@/componentsShadCn/ui/hover-card';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

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
interface FetchNutriValuesProps {
  userId: string; // Change the type to the actual type of your 'id' prop
}
const FetchNutriValues: React.FC<FetchNutriValuesProps> = ({ userId }) => {
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
  const mainNutrients = [
    'Energy',
    'Total lipid (fat)',
    'Carbohydrate, by difference',
    'Sugars, total including NLEA',
    'Protein',
  ];
  const allowedNutrients = [
    'Protein',
    'Total lipid (fat)',
    'Carbohydrate, by difference',
    'Energy',
    'Alcohol, ethyl',
    'Water',
    'Caffeine',
    'Theobromine',
    'Sugars, total including NLEA',
    'Fiber, total dietary',
    'Calcium, Ca',
    'Iron, Fe',
    'Magnesium, Mg',
    'Phosphorus, P',
    'Potassium, K',
    'Sodium, Na',
    'Zinc, Zn',
    'Copper, Cu',
    'Selenium, Se',
    'Retinol',
    'Vitamin A, RAE',
    'Carotene, beta',
    'Carotene, alpha',
    'Vitamin E (alpha-tocopherol)',
    'Vitamin D (D2 + D3)',
    'Cryptoxanthin, beta',
    'Lycopene',
    'Lutein + zeaxanthin',
    'Vitamin C, total ascorbic acid',
    'Thiamin',
    'Riboflavin',
    'Niacin',
    'Vitamin B-6',
    'Folate, total',
    'Vitamin B-12',
    'Choline, total',
    'Vitamin K (phylloquinone)',
    'Folic acid',
    'Folate, food',
    'Folate, DFE',
    'Vitamin E, added',
    'Vitamin B-12, added',
    'Cholesterol',
    'Fatty acids, total saturated',
    'SFA 4:0',
    'SFA 6:0',
    'SFA 8:0',
    'SFA 10:0',
    'SFA 12:0',
    'SFA 14:0',
    'SFA 16:0',
    'SFA 18:0',
    'MUFA 18:1',
    'PUFA 18:2',
    'PUFA 18:3',
    'PUFA 20:4',
    'PUFA 22:6 n-3 (DHA)',
    'MUFA 16:1',
    'PUFA 18:4',
    'MUFA 20:1',
    'PUFA 20:5 n-3 (EPA)',
    'MUFA 22:1',
    'PUFA 22:5 n-3 (DPA)',
    'Fatty acids, total monounsaturated',
    'Fatty acids, total polyunsaturated',
  ];
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const supabaseClient = useSupabaseClient();
  const addFood = async ({
    json,
    energy,
    protein,
    fat,
    carbs,
    sugar,
    name,
  }: any) => {
    const { error: supabaseError } = await supabaseClient
      .from('userFood')
      .insert({
        food: json,
        energy: energy,
        protein: protein,
        fat: fat,
        carbs: carbs,
        sugar: sugar,
        name: name,
        user_id: userId,
      });
    if (supabaseError) {
      return toast.error(supabaseError.message);
    } else {
      toast.success('Food added successfully');
      console.log(protein);
    }
  };
  const handleFetchClick = () => {
    fetchData();
  };

  // console.log(data?.foods[0].foodNutrients[0].nutrientId);
  return (
    <div className="bg-violet-200 dark:bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="mb-2 flex flex-col gap-y-6">
        <Header>
          <div className="mb-2 flex flex-col gap-y-6">
            <h1 className="text-white text-3xl font-semibold">Search</h1>
          </div>
        </Header>
        {error && <p>Error: {error}</p>}
        <div className="flex flex-col gap-y-2 w-full px-6">
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
                        <CardTitle className="text-lg font-bold w-[200px]">
                          {food.description}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          Serving Size: 100g
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid gap-2">
                          {food.foodNutrients
                            .filter((nutrient) => nutrient.value !== 0)
                            .filter((nutrient) =>
                              mainNutrients.includes(nutrient.nutrientName)
                            )
                            .map((nutrient) => (
                              <div
                                key={nutrient.nutrientId}
                                className="flex justify-between"
                              >
                                <p className="text-sm">
                                  {nutrient.nutrientName}
                                </p>
                                <p className="text-sm">
                                  {nutrient.value}
                                  {nutrient.unitName !== 'KCAL' && (
                                    <span>{nutrient.unitName}</span>
                                  )}
                                </p>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 ">
                        <Button
                          onClick={() => {
                            addFood({
                              protein: food.foodNutrients[0].value,
                              energy: food.foodNutrients[3].value,
                              fat: food.foodNutrients[1].value,
                              sugar: food.foodNutrients[4].value,
                              carbs: food.foodNutrients[2].value,
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
                            <h4 className="text-sm font-semibold pb-2">
                              Detailed Nutrition Facts
                            </h4>
                            <div className="text-sm">
                              {food.foodNutrients
                                .filter((nutrient) => nutrient.value !== 0)
                                .filter((nutrient) =>
                                  allowedNutrients.includes(
                                    nutrient.nutrientName
                                  )
                                )
                                .map((nutrient) => (
                                  <div
                                    key={nutrient.nutrientId}
                                    className="flex justify-between"
                                  >
                                    <p className="text-sm">
                                      {nutrient.nutrientName}
                                    </p>
                                    <p className="text-sm">
                                      {nutrient.value}
                                      {nutrient.unitName !== 'KCAL' && (
                                        <span>{nutrient.unitName}</span>
                                      )}
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
