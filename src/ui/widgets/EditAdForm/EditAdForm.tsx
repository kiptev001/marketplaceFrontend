'use client';
import { Input } from '../../shared/Input';
import { Dropdown } from '../../shared/Dropdown';
import { FileInput } from '../FileInput';
import React, { useEffect, useState } from 'react';
import { Ad, Currencies } from '@/src/ui/entities/Ad/types';
import { Button } from '../../shared/Button';
import api from '@/src/http';

const EditAdForm = ({ ad }:{ad:Ad}) => {
  const IMAGE_SERVER_URL='https://api.thaisell.net';
  const [images, setImages]=useState<File[] | null>([]);

  useEffect(() => {
    async function fetchImages() {
      if (!ad?.images) return;

      try {
        const files = await Promise.all(
          ad.images.map(async (url) => {
            const response = await fetch(`${IMAGE_SERVER_URL}${url}`);
            const blob = await response.blob();
            const filename = url.split('/').pop() || 'image';
            return new File([blob], filename, { type: blob.type });
          })
        );

        setImages(files);
      } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
      }
    }

    fetchImages();
  }, [ad?.images]);

  async function handleSubmit(data: FormData) {
    const formDataObject = Object.fromEntries(data.entries());
    console.log(formDataObject);

    // const AdData = {
    //   id: ad?.id,
    //   title: ad.title,
    //   price: parseInt(ad?.price, 10),
    //   currency: ad.currency,
    //   location: ad.location,
    //   description: ad.description,
    //   images: [],
    //   contacts: ad.contacts
    // };

    // const response = await api.post(`/ads/edit?id=${ad.id}`, AdData);
  }

  return (
    <form action={handleSubmit}>
      <Input defaultValue={ad?.title} name='title'/>
      <Input defaultValue={ad?.price} name='price'/>
      <Dropdown optionsEnum={Currencies} name='currency'/>
      <Input defaultValue={ad?.description} name='description'/>
      <Input defaultValue={ad?.description} name='location'/>
      <FileInput setImages={setImages} images={images} accept="image/*" multiple />
      {/* {fields.map((item, index) => (
        <div key={item.id} className={styles.contact}>
          <p>Тип</p>
          <Controller
            name={`contacts.${index}.type`}
            control={control}
            defaultValue={item.type}
            render={({ field }) => (
              <Dropdown optionsEnum={ContactTypes} {...field} className={styles.select}/>
            )}
          />
          <p>Значение</p>
          <Controller
            name={`contacts.${index}.value`}
            control={control}
            defaultValue={item.value}
            render={({ field }) => (
              <Input
                {...field}
                theme={ThemeInput.OUTLINED}
                size={SizeInput.LARGE}
              />
            )}
          />
          <Button className={styles.removeContactButton} type="button" onClick={() => remove(index)} size={SizeButton.MEDIUM}>
            <DeleteForeverIcon />
          </Button>
        </div>
      ))}
      <Button className={styles.addContactButton} type="button" onClick={() => append({ type: ContactTypes.WhatsApp, value: '' })} size={SizeButton.MEDIUM}>
        Добавить контакт
      </Button> */}

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default EditAdForm;
