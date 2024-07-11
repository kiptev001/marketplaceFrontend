import Image from 'next/image';
import styles from './AdCard.module.scss';
import { Button } from '@/app/ui/shared/Button/index';
import { Ad } from '../../../types';

export interface AdCardProps {
    ad: Ad;
}

export default function AdCard ({ad}:AdCardProps){
  return <div className={styles.adCard}>
    {ad?.imagesUrls?<Image width={206} height={150} src={ad?.imagesUrls[0]} alt={'Ad main photo'}/>:<div className={styles.noImage}>No Image</div>}
    <div>
      <div className={styles.title}>
        <span>{ad.title}</span>
        <Button className={styles.addToFavorites}>A</Button>
      </div>
      <div>{ad.price}</div>
      <div>{ad.location}</div>
      <div>{ad.publicationDate}</div>
    </div>
  </div>;
}
