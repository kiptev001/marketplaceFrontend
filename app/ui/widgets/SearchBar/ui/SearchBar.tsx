import React from 'react';
import styles from './SearchBar.module.scss';
import { Button } from '@/app/ui/shared/Button';
import { Input } from '@/app/ui/shared/Input';

export default function SearchBar() {
  return (
    <section className={styles.searchbar}>
      <Button className={styles.button}>Все категории</Button>
      <div className={styles.inputAndButton}>
        <Input className={styles.input}/>
        <Button className={styles.button}>Найти</Button>
      </div>
    </section>
  );
}
