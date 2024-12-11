import React from 'react';
import styles from './ProfilePage.module.scss';
import MyAdsAdCard from '@/src/ui/entities/Ad/ui/MyAdsAdCard';
import { Ad } from '@/src/ui/entities/Ad/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const MyAdsPage = async () => {
  const cookiesStore = cookies();
  const cookieString = cookiesStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const apiUrl = process.env.API_URL || 'http://thaisell.net/api';

  const response = await fetch(`${apiUrl}/ads/myAds`,{ method: 'GET',  headers: {
    'Content-Type': 'application/json',
    'Cookie': cookieString,
  }, });

  if(response.status === 401){
    redirect('/login');
  }

  const ads:Ad[] = await response.json();

  if(ads.length>0){
    return (
      <div className={styles.wrapper}>
        <h5 className={styles.title}>Мои объявления</h5>
        <div className={styles.list}>
          {ads.map(ad=><MyAdsAdCard className={styles.item} key={ad.id} ad={ad}/>)}
        </div>
      </div>
    );
  }

  return(<div className={styles.wrapper}>
    <h5 className={styles.title}>Объявления не найдены</h5>
  </div>);
};

export default MyAdsPage;
