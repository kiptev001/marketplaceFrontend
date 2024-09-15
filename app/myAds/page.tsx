'use client';
import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import api from '../src/http';
import MyAdsAdCard from '../ui/entities/Ad/ui/MyAdsAdCard';
import { Ad } from '../ui/entities/Ad/types';
import { Loader } from '../ui/shared/Loader';

const MyAdsPage = () => {
  const [myAds, setMyAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchMyAds = async ()=>{
    try {
      setIsLoading(true);
      const response = await api.get('/ads/myAds');
      setMyAds( response?.data );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAds();
  }, []);

  if(isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      {myAds.map(ad=><MyAdsAdCard key={ad.id} ad={ad}/>)}
    </div>
  );
};

export default MyAdsPage;
