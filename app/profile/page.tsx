'use client';
import React from 'react';
import { useAuth } from '../ui/providers/AuthProvider';

const ProfilePage = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Привет, {auth.user?.email}</h1>
      <div>Имя</div>
      <div>Фамилия</div>
      <div>Email</div>
    </div>
  );
};

export default ProfilePage;
