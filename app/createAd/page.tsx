'use client';
import React, { useState } from 'react';
import { Input } from '../ui/shared/Input';
import { Button } from '../ui/shared/Button';
import axios from 'axios';
import api from '../src/http/index';
import { IAd } from '../src/types';

const create = async (data: IAd) => {
  console.log(data);
  try {
    const response = await api.post('/ads/create', data);
    console.log('RESPONSE ', response);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: IAd = {
      title,
      price: parseInt(price, 10),
      location,
      description,
      userId: parseInt(userId, 10),
    };
    create(data);
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
        <Button type='submit'>CREATE</Button>
      </form>
    </>
  );
}

export default CreateAdPage;
