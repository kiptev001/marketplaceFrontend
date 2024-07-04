'use client';
import React, { useState } from 'react';
import { Input } from '../ui/shared/Input';
import { Button } from '../ui/shared/Button';
import axios, { AxiosError } from 'axios';

const createUser = async (email:string, password:string) => {
  try {
    const response = await axios.post('/api/users/createUser', {
      email,
      password
    });
    console.log('User created:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating user:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

function RegistrationPage  () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div>Registration Page</div>
      <div>{email}</div>
      <div>{password}</div>
      <Input value={email} onChange={(value)=> setEmail(value)}/>
      <Input value={password} onChange={(value)=> setPassword(value)}/>
      <Button onClick={()=>createUser(email,password)}>Registration</Button>
    </>
  );
};

export default RegistrationPage;

