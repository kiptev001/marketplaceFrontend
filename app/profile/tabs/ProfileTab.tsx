import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useAuth } from '../../ui/providers/AuthProvider';
import { Input } from '@/app/ui/shared/Input';
import { Button } from '@/app/ui/shared/Button';

interface FormData {
  firstName: string;
  secondName: string;
  email: string | undefined;
}

const ProfileTab = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: auth?.user?.firstName || '',
    secondName: auth?.user?.secondName ||  '',
    email: auth?.user?.email || ''
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form data:', formData);
    console.log(auth.user);
  };

  return (
    <>
      <div>Имя</div>
      <div>Фамилия</div>
      <div>Email</div>
    </>
  );
};

export default ProfileTab;
