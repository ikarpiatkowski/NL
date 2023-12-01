'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button } from '@/componentsShadCn/ui/button';
import { Input } from '@/componentsShadCn/ui/input';
import { BiSearch } from 'react-icons/bi';

export default function SearchFood() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch('');
    router.push(`/search/${search}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full p-4">
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Search for food with Ninja API"
          value={search}
          className="w-60 mr-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">
          <BiSearch size={22} /> Search
        </Button>
      </div>
    </form>
  );
}
