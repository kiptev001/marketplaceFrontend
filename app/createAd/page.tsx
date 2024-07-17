'use client';
import React, { useRef, useState } from 'react';
import { Input, ThemeInput, SizeInput } from '../ui/shared/Input';
import { Button, SizeButton } from '../ui/shared/Button';
import axios from 'axios';
import api from '../src/http/index';
import { Ad, Contact } from '../ui/entities/Ad/types';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import styles from './createAd.module.scss';
import { Dropdown } from '../ui/shared/Dropdown';
import { FileInput } from '../ui/widgets/FileInput';

enum Currencies {
  'RUB'= 'RUB',
  'USD' = 'USD',
  'THB' = 'THB'
}

type Inputs = {
  title: string
  price: string
  location: string
  description: string
  userId: number
  currency: Currencies
  images: FileList
  contacts: Array<Contact>
}

function CreateAdPage() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const [images, setImages] = useState<Array<File>|null>(null);
  const onSubmit :SubmitHandler<Inputs> = async (values) => {

    const imageUrls = await saveImages();
    const data: Ad = {
      title:values.title,
      price: parseInt(values.price, 10),
      currency:values.currency,
      location:values.location,
      description:values.description,
      userId: 1,
      images: imageUrls
    };

    createAd(data);
  };

  const saveImages = async () => {
    const uploadFile = async (file: File):Promise<string> => {
      const formdata = new FormData();
      formdata.append('files', file);

      const requestOptions = {
        method: 'POST',
        body: formdata,
      };

      const response = await fetch('/api/images/upload', requestOptions);
      const { imageUrl } = await response.json();
      return imageUrl;
    };

    if(!images)return null;

    const imageUrls = await Promise.all(images.map(file => uploadFile(file)));

    return imageUrls;
  };

  const createAd = async (data: Ad) => {
    try {
      const response = await api.post('/ads/create', data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating ad:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={styles.newAdPage}>
      <h1 className={styles.h1}>Новое объявление</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.h2}>Параметры</h2>

        <div className={styles.fieldWrapper}>
          <div className={styles.fieldWrapperText}>
            <p>Название объявления</p>
          </div>
          <div className={styles.fieldWrapperInput}>
            <Controller
              name="title"
              rules={{
                required: 'Введите название объявления'
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  theme={ThemeInput.OUTLINED}
                  size={SizeInput.LARGE}
                />
              )}
            />
          </div>
        </div>

        <div className={styles.fieldWrapper}>
          <div className={styles.fieldWrapperText}>
            <p>Цена</p>
          </div>
          <div className={styles.fieldWrapperInput}>
            <Controller
              name="price"
              rules={{
                required: 'Введите цену'
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  theme={ThemeInput.OUTLINED}
                  size={SizeInput.LARGE}
                />
              )}
            />
            <Dropdown optionsEnum={Currencies} register={register('currency')}/>
          </div>
        </div>

        <h2 className={styles.h2}>Подробности</h2>

        <div className={styles.fieldWrapper}>
          <div className={styles.fieldWrapperText}>
            <p>Описание объявления</p>
          </div>
          <div className={styles.fieldWrapperInput}>
            <Controller
              name="description"
              rules={{
                required: 'Введите описание объявления'
              }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea className={styles.textarea} {...field}/>
              )}
            />
          </div>
          
         
        </div>

        <div className={styles.fieldWrapper}>
          <div className={styles.fieldWrapperText}>
            <p>Место продажи</p>
          </div>
          <div className={styles.fieldWrapperInput}>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  theme={ThemeInput.OUTLINED}
                  size={SizeInput.LARGE}
                />
              )}
            />
          </div>
        </div>

        <h2 className={styles.h2}>Фотографии</h2>
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldWrapperText}>
            <p>Выберите одну или несколько фотографий</p>
          </div>
          <div className={styles.fieldWrapperInput}>
            <FileInput images={images} setImages={setImages} accept="image/*" multiple register={register}/>
          </div>
        </div>

        <Button size={SizeButton.MEDIUM} type='submit'>Создать</Button>
      </form>
    </div >
  );
}

export default CreateAdPage;
