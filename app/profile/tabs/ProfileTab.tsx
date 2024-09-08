import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useAuth } from '../../ui/providers/AuthProvider';
import { Input } from '@/app/ui/shared/Input';
import { Button } from '@/app/ui/shared/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './ProfileTab.module.scss';

interface Inputs {
  firstName: string;
  secondName: string;
  email: string;
}

const ProfileTab = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const registerFirstName  = { ...register('firstName', { required: true }) };
  const registerSecondName = { ...register('secondName', { required: true }) };
  const registerEmail = { ...register('email', { required: true }) };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formRow}>
        <div>Имя</div>
        <Input register={registerFirstName} defaultValue={auth.user?.firstName}/>
      </div>
      <div className={styles.formRow}>
        <div>Фамилия</div>
        <Input register={registerSecondName} defaultValue={auth.user?.secondName}/>
      </div>
      <div className={styles.formRow}>
        <div>Email</div>
        <Input register={registerEmail} defaultValue={auth.user?.email}/>
      </div>
      <Button type='submit'>Сохранить</Button>
    </form>
  );
};

export default ProfileTab;
