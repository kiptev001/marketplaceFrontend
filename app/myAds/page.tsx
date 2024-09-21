'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './ProfilePage.module.scss';
import api from '../src/http';
import MyAdsAdCard from '../ui/entities/Ad/ui/MyAdsAdCard';
import { Ad } from '../ui/entities/Ad/types';
import { Loader } from '../ui/shared/Loader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';

const MyAdsPage = () => {
  const [myAds, setMyAds] = useState<Ad[]>([]);
  const [response,setResponse]= useState<AxiosResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const fetchMyAds =useCallback( async ()=>{
    try {
      setIsLoading(true);
      const response = await api.get('/ads/myAds');
      setResponse(response);
      setMyAds( response?.data );
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error('Сначала нужно авторизоваться', { position: 'bottom-left' });
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  },[router]);

  useEffect(() => {
    fetchMyAds();
  }, [fetchMyAds]);

  if(isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Мои объявления</h5>
      <div>{response?.status}</div>
      <div>{response?.data.length}</div>
      <div className={styles.list}>
        {myAds.map(ad=><MyAdsAdCard className={styles.item} key={ad.id} ad={ad}/>)}
      </div>
    </div>
  );
};

export default MyAdsPage;
