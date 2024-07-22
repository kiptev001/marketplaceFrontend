import Image from 'next/image';
import styles from './AdCard.module.scss';
import { Button } from '@/app/ui/shared/Button/index';
import { Ad } from '../../../types';
import { AppLink } from '@/app/ui/shared/AppLink';
import formatDate from '@/app/src/helpers/formatDate';
import cn from 'clsx';

export interface AdCardProps {
    ad: Ad;
    className: string;
}

export default function AdCard ({ad,className}:AdCardProps){
  return <div className={cn(styles.adCard,{},[className])}>
    <div className={styles.imageWrapper}>
      {ad?.images?<Image className={styles.image} fill src={`https://api.thaisell.net${ad?.images[0]}`} alt={'Ad main photo'}/>:<div className={styles.noImage}>No Image</div>}
    </div>
    <div className={styles.description}>
      <AppLink href={`/ad/${ad.id}`} className={styles.title}>{ad.title}</AppLink>
      <Button className={styles.addToFavorites}>+</Button>
      <span className={styles.price}>{ad.price} {ad.currency}</span>
      <span className={styles.location}>{ad.location}</span>
      <span className={styles.createdAt}>{formatDate(ad?.createdat as string)}</span>
    </div>
  </div>;
}
