'use client';

import { Input, SizeInput } from '../../shared/Input';
import { Dropdown } from '../../shared/Dropdown';
import { FileInput } from '../FileInput';
import React, { useEffect, useState } from 'react';
import { Ad, Contact, Currencies } from '@/src/ui/entities/Ad/types';
import { Button, SizeButton } from '../../shared/Button';
import { ContactTypes } from '@/src/ui/entities/Ad/types';
import { Controller, useFieldArray } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditAdForm = ({ ad }:{ad:Ad}) => {
  const IMAGE_SERVER_URL='https://api.thaisell.net';
  const [images, setImages]=useState<File[] | null>([]);
  const [contacts, setContacts]=useState<Contact[]>([]);

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
    console.log(formDataObject);
    console.log(contacts);

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
    <form action={handleSubmit}>
      <Input defaultValue={ad?.title} name='title'/>
      <Input defaultValue={ad?.price} name='price'/>
      <Dropdown optionsEnum={Currencies} name='currency'/>
      <Input defaultValue={ad?.description} name='description'/>
      <Input defaultValue={ad?.description} name='location'/>
      {contacts && contacts.map((contact, index) => (
        <div key={index}>
          <Dropdown
            optionsEnum={ContactTypes}
            defaultValue={contact?.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateContact(index, 'type', e?.target?.value)}
          />
          <Input
            defaultValue={contact.value}
            onChange={(value) => updateContact(index, 'value', value)}
            placeholder="Введите контакт"
          />
          <Button type="button" onClick={() => removeContact(index)}>
            Удалить
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addContact}>
        Добавить контакт
      </Button>
      <FileInput setImages={setImages} images={images} accept="image/*" multiple />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default EditAdForm;
