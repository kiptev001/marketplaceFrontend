import React from 'react';
import styles from './MyAdsAdCard.module.scss';
import { Ad } from '../../../types';
import { SearchAdCard } from '../../SearchAdCard';
import cn from 'clsx';
import { Button, SizeButton, ThemeButton } from '@/src/ui/shared/Button';
import Link from 'next/link';

interface MyAdsAdCardProps {
    ad: Ad
    className?: string
}

const MyAdsAdCard = ({ ad,className }:MyAdsAdCardProps) => {

  return (
    <div className={cn(styles.card, className)}>
      <SearchAdCard ad={ad}/>
      <div className={cn(styles.buttons)}>
        <Link className={styles.EditLink} href={`/editAd/${ad.id}`}>
          <Button size={SizeButton.MEDIUM} theme={ThemeButton.BACKGROUND}>Редактировать</Button>
        </Link>
        <Button size={SizeButton.MEDIUM} theme={ThemeButton.RED}>Удалить</Button>
      </div>
    </div>
  );
};

export default MyAdsAdCard;
