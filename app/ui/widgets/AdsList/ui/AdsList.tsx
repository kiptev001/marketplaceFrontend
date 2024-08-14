import { GetStaticProps } from 'next';
import styles from './AdsList.module.scss';
import { AdCard } from '@/app/ui/entities/Ad/ui/AdCard/index';
import api from '@/app/src/http/index';
import { Ad } from '@/app/ui/entities/Ad/types';

export default async function AdsList() {
  const response = await fetch('https://thaisell.net/api/ads/getMany');
  const ads = await response.json();

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Рекомендации для вас</h5>
      <div className={styles.list}>
        {ads && ads.map((ad:Ad) => (
          <AdCard className={styles.item} key={ad.title} ad={ad} />
        ))}
        {!ads && <div>Загрузка...</div>}
      </div>
    </div>
  );
}
