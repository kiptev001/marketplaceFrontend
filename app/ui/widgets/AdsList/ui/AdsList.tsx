import styles from './AdsList.module.scss';
import { AdCard } from '@/app/ui/entities/Ad/ui/AdCard/index';
import { Ad } from '@/app/ui/entities/Ad/types';

export default async function AdsList() {
  const response = await fetch(`${process.env.API_URL}/ads/getMany`, { cache: 'no-store' });
  console.log('API_URL = ',process.env.API_URL);
  console.log('RESPONSE = ',response);
  const ads = await response.json();
  console.log('ADS = ',ads);
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
