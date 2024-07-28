'use client';
import styles from './AdsList.module.scss';
import { AdCard } from '@/app/ui/entities/Ad/ui/AdCard/index';
import api from '@/app/src/http/index';
import { useEffect, useState } from 'react';
import { Ad } from '@/app/ui/entities/Ad/types';
import { AxiosResponse } from 'axios';

export default function AdsList(){
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response: AxiosResponse<Ad[]> = await api.get<Ad[]>('/ads/getMany');
        setAds(response.data);
      } catch (err) {
        setError('Failed to fetch ads');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if(loading)return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Рекомендации для вас</h5>
      <div className={styles.list}>
        {ads.map(ad=><AdCard className={styles.item} key={ad.title} ad={ad}/>)}
      </div>
    </div>
  );
}
