'use client';
import { useRouter } from 'next/navigation';
import { Input, SizeInput } from '../../shared/Input';
import { Dropdown } from '../../shared/Dropdown';
import { FileInput } from '../FileInput';
import React, { useEffect, useState } from 'react';
import { Ad, Contact, Currencies } from '@/src/ui/entities/Ad/types';
import { Button, SizeButton, ThemeButton } from '../../shared/Button';
import { ContactTypes } from '@/src/ui/entities/Ad/types';
import { Controller, useFieldArray } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from '@/src/http';
import { Close } from '@mui/icons-material';
import st from './EditAdForm.module.scss';
import { saveImages } from '@/src/helpers/saveImagesToImageServer';
import { toast } from 'react-toastify';

const EditAdForm = ({ ad }:{ad:Ad}) => {
  const IMAGE_SERVER_URL='https://api.thaisell.net';
  const [images, setImages]=useState<File[] | null>([]);
  const [contacts, setContacts]=useState<Contact[]>([]);
  const router = useRouter();

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

  useEffect(()=>{
    //@ts-expect-error
    const contactsArray = JSON.parse(ad?.contacts);
    setContacts(contactsArray);
  },[ad]);

  async function handleSubmit(data: FormData) {
    const formDataObject = Object.fromEntries(data.entries());
    // Нужно сделать механизм, который сравнивает старые фото и новые фото
    const oldImagesNames = ad?.images?.map(fileName=>fileName.slice(9));
    const newImagesNames = images?.map(file=>file.name);
    const filesToAdd = newImagesNames?.filter((fileName)=>{
      return(!oldImagesNames?.includes(fileName));
    });
    const filesToDelete = oldImagesNames?.filter((fileName)=>{
      return(!newImagesNames?.includes(fileName));
    });
    // пройтись по массивам запросами и удалить / добавить фотографии на сервер
    
    const AdData = {
      id: ad?.id,
      title: formDataObject?.title,
      price: formDataObject?.price,
      currency: formDataObject?.currency,
      location: formDataObject?.location,
      description: formDataObject?.description,
      images: ad?.images,
      contacts: contacts
    };

    try {
      const response = await api.post(`/ads/edit?id=${ad.id}`, AdData);
      if(response.status === 200){
        toast.success('Изменения сохранены',{ position: 'top-left' });
        router.push('/myAds');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addContact = () => {
    setContacts((prev) => [...prev, { type: ContactTypes.WhatsApp, value: '' }]);
  };

  const updateContact = (index: number, field: keyof Contact, value: string) => {
    setContacts((prev) =>
      prev.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    );
  };

  const removeContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form className={st.Form} action={handleSubmit}>
      <Input size={SizeInput.LARGE} defaultValue={ad?.title} name='title'/>
      <div className={st.PriceRow}>
        <Input className={st.PriceValueInput} size={SizeInput.LARGE} defaultValue={ad?.price} name='price'/>
        <Dropdown optionsEnum={Currencies} name='currency'/>
      </div>
      <textarea className={st.Textarea} defaultValue={ad?.description} name='description'/>
      <Input size={SizeInput.LARGE} defaultValue={ad?.location} name='location'/>
      {contacts && contacts.map((contact, index) => (
        <div className={st.ContactRow} key={index}>
          <Dropdown
            optionsEnum={ContactTypes}
            defaultValue={contact?.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateContact(index, 'type', e?.target?.value)}
          />
          <Input
            className={st.ContactValueInput}
            size={SizeInput.LARGE}
            defaultValue={contact.value}
            onChange={(value) => updateContact(index, 'value', value)}
            placeholder="Введите контакт"
            button={
              <Button theme={ThemeButton.CLEAR} className={st.DeleteContactButton} type="button" onClick={() => removeContact(index)}>
                <Close />
              </Button>}
          />
        </div>
      ))}
      <Button size={SizeButton.LARGE} type="button" onClick={addContact}>
        Добавить контакт
      </Button>
      <FileInput setImages={setImages} images={images} accept="image/*" multiple />
      <Button size={SizeButton.LARGE} className={st.SubmitButton} type='submit'>Готово</Button>
    </form>
  );
};

export default EditAdForm;
