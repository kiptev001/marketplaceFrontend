'use client';
import { useCallback, useEffect, useState } from 'react';
import api from '@/src/http';
import styles from './styles.module.scss';
import { Ad, Contact, ContactTypes } from '@/src/ui/entities/Ad/types';
import Image from 'next/image';
import cn from 'clsx';
import formatDate from '@/src/helpers/formatDate';

export default function AdPage({ params }: { params: { id: string } }){
  const [ad,setAd]=useState<Ad | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const getAd = useCallback( async ()=>{
    const response = await api.get('/ads/getOne',{ params: { id: params.id } });
    setAd(()=>{
      return { ...response.data, contacts: JSON.parse(response.data.contacts) };
    });
    setSelectedPhoto(response.data.images[0]);
  },[params.id]);

  useEffect(() => {
    getAd();
  }, [getAd]);
    
  return (
    <section className={styles.adPage}>
      <hr/>
      <div className={styles.titlePrice}>
        <h1 className={cn(styles.title,styles.heading)}>{ad?.title}</h1>
        <h1 className={cn(styles.price,styles.heading)}>{ad?.price} {ad?.currency}</h1>
      </div>
      { ad?.images && ad?.images[0]!== 'undefined' &&<div className={styles.imageBlock}>
        <div className={styles.mainImage}>
          {ad?.images && ad?.images[0]&&<Image className={styles.image} fill alt='Image' src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${selectedPhoto}`}/>}
        </div>
        <div className={styles.allImages}>
          {ad?.images && ad?.images?.length > 1 && ad?.images.map((url)=><Image onClick={()=>setSelectedPhoto(url)} className={cn(styles.image,url===selectedPhoto? styles.selected:null)} width={150} height={150} key={url} alt='Image' src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${url}`}/>)}
        </div>
      </div>}
      <h2 className={styles.heading}>Описание</h2>
      <div className={styles.description}>{ad?.description}</div>
      <h2 className={styles.heading}>Место продажи</h2>
      <div className={styles.location}>{ad?.location}</div>
      <h2 className={styles.heading}>Дата размещения объявления</h2>
      <div className={styles.createdat}>{formatDate(ad?.createdat as string)}</div>
      {ad?.contacts && ad?.contacts?.map((contact:Contact)=>{
        if(contact.type === 'Telegram' && contact.value[0]==='@'){
          contact.value = contact.value.slice(1);
        }

        if(contact.type === 'Phone' && contact.value?.[0]==='+'){
          contact.value = contact.value.slice(1);
        }

        if(contact.type === 'Telegram'){
          return (<a key={contact.type} href={`https://t.me/${contact.value}`} target="_blank">Chat on Telegram</a>);
        } else if (contact.type === 'WhatsApp'){
          return (<a key={contact.type} href={`https://wa.me/${contact.value}`} target="_blank">Chat on WhatsApp</a>);
        } else {
          return (<a key={contact.type} href={'tel:+{contact.value}'}>Call {contact.value}</a>);
        }
      })}
    </section>
  );
}
