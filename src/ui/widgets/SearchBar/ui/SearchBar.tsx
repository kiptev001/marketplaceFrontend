'use client';
import React, { useCallback, useState } from 'react';
import styles from './SearchBar.module.scss';
import { Button } from '@/src/ui/shared/Button';
import { Input } from '@/src/ui/shared/Input';
import { usePathname, useRouter } from 'next/navigation';


export default function SearchBar() {
  const [query,setQuery]=useState('');
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);
 
      return params.toString();
    },
    []
  );

  const handleSearch = () =>{
    if(!query)return;
    router.push(process.env.NEXT_PUBLIC_CLIENT_URL + '/search' + '?' + createQueryString('query', query));
  };

  return (
    <section className={styles.searchbar}>
      <Button className={styles.button}>Все категории</Button>
      <div className={styles.inputAndButton}>
        <Input value={query} onChange={setQuery} className={styles.input}/>
        <Button onClick={handleSearch} className={styles.button}>Найти</Button>
      </div>
    </section>
  );
}
