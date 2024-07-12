'use client';
import React, { useRef, useState } from 'react';
import { Input } from '../ui/shared/Input';
import { Button } from '../ui/shared/Button';
import axios from 'axios';
import api from '../src/http/index';
import { IAd } from '../src/types';

const create = async (data: IAd) => {
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

function CreateAdPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const inputRef = useRef();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageUrl = await saveImage();
    const data: IAd = {
      title,
      price: parseInt(price, 10),
      location,
      description,
      userId: parseInt(userId, 10),
      images: [imageUrl]
    };

    create(data);
  };

  const saveImage = async () => {
    var formdata = new FormData();
    formdata.append('files', inputRef.current.files[0]);

    var requestOptions = {method: 'POST', body: formdata };

    const response = await fetch('/api/images/upload', requestOptions);
    const {imageUrl} = await response.json();
    return imageUrl;
  };

  return (
    <>
      <div>Create new ad page</div>
      <form onSubmit={handleSubmit}>
        <Input name='title' placeholder='TITLE' value={title} onChange={(e) => setTitle(e)} />
        <Input name='price' placeholder='PRICE' value={price} onChange={(e) => setPrice(e)} />
        <Input name='location' placeholder='LOCATION' value={location} onChange={(e) => setLocation(e)} />
        <Input name='description' placeholder='DESCRIPTION' value={description} onChange={(e) => setDescription(e)} />
        <Input name='userId' placeholder='USERID' value={userId} onChange={(e) => setUserId(e)} />
        <input ref={inputRef} type='file'/>
        <Button type='submit'>CREATE</Button>
      </form>
    </>
  );
}

export default CreateAdPage;
