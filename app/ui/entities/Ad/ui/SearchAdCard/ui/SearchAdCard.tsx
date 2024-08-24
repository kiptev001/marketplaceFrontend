import React from 'react';
import styles from './SearchAdCArd.module.scss';
import { Ad } from '../../../types';
import Image from 'next/image';
import { AppLink } from '@/app/ui/shared/AppLink';

interface SearchAdCardProps {
    ad:Ad
}

export const SearchAdCard = ({ ad }:SearchAdCardProps) => {

  return (
    <div className={styles.Card}>
      <div className={styles.ImageBlock}>
        {ad.images && ad?.images[0]!=='undefined' && <Image fill className={styles.Image} src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${ad?.images[0]}`} alt={'Ad main photo'}/>}
      </div>
      <div className={styles.InfoBlock}>
        <AppLink href={`/ad/${ad.id}`} className={styles.Title}>{ad.title}</AppLink>
        <div className={styles.PriceBlock}>
          <h4>{ad.price}</h4>
          <h4>{ad.currency}</h4>
        </div>
        <div className={styles.Description}>{ad.description}</div>
        <div className={styles.Location}>{ad.location}</div>
      </div>
    </div>
  );
};
