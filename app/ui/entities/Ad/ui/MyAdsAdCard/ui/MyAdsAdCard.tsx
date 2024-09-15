import React from 'react';
import styles from './MyAdsAdCard.module.scss';
import { Ad } from '../../../types';
import { SearchAdCard } from '../../SearchAdCard';
import cn from 'clsx';
import { Button, SizeButton, ThemeButton } from '@/app/ui/shared/Button';

interface MyAdsAdCardProps {
    ad: Ad
}

const MyAdsAdCard = ({ ad }:MyAdsAdCardProps) => {
  return (
    <div className={cn(styles.card)}>
      <SearchAdCard ad={ad}/>
      <div className={cn(styles.buttons)}>
        <Button size={SizeButton.MEDIUM} theme={ThemeButton.OUTLINE}>Редактировать</Button>
        <Button size={SizeButton.MEDIUM} theme={ThemeButton.RED}>Удалить</Button>
      </div>
    </div>
  );
};

export default MyAdsAdCard;
