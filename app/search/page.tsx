'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('query');

  return (
    <>
      <div>SearchPage</div>
      <div>{search}</div>
    </>
  );
};

export default SearchPage;
