import React from 'react';
import { SearchAdCard } from '@/src/ui/entities/Ad/ui/SearchAdCard/index';

interface SearchPageProps {
  searchParams: Record<string,string>
}

const SearchPage = async ({ searchParams }:SearchPageProps) => {
  const response = await fetch(`${process.env.API_URL}/ads/search?query=${searchParams.query}`);
  const result = await response.json();

  if(result.error)return <h2>Объявлений по запросу &quot;{searchParams.query}&quot; не найдено</h2>;

  return (
    <>
      <h2>Объявления по запросу &quot;{searchParams.query}&quot;: {result.length}</h2>
      { [...result].map((ad)=>{
        return(
          <SearchAdCard key={ad.id} ad={ad}/>
        );
      })}
    </>
  );
};

export default SearchPage;
