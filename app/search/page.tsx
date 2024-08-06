import React from 'react';
import api from '../src/http';
import { AdCard } from '../ui/entities/Ad/ui/AdCard';

interface SearchPageProps {
  searchParams: Record<string,string>
}

const SearchPage = async ({searchParams}:SearchPageProps) => {
  const response = await fetch(`http://localhost:3000/api/ads/search?query=${searchParams.query}`);
  const result = await response.json();

  return (
    <>
      <div>SearchPage</div>
      {!result.error && [...result].map((ad)=>{
        return(
          <AdCard key={ad.id} ad={ad}/>
        );
      })}
    </>
  );
};

export default SearchPage;
