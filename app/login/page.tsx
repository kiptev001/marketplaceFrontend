'use client';
import React from 'react';
import { Input, SizeInput, ThemeInput } from '@/src/ui/shared/Input';
import { Button, SizeButton } from '@/src/ui/shared/Button';
import axios from 'axios';
import api from '../../src/http/index';
import { Controller, SubmitHandler,useForm } from 'react-hook-form';
import styles from '../registration/registration.module.scss';
import { toast } from 'react-toastify';
import { useAuth } from '@/src/ui/providers/AuthProvider';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string
  password: string
}

function LoginPage  () {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password
      });
      toast.success('Success login',{ position: 'bottom-left' });
      localStorage.setItem('token', response.data.accessToken);
      login();
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, { position: 'bottom-left' });
        console.error('Login error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          rules={{
            required: 'Введите email',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Введите корректный email'
            }
          }}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Email'
              theme={ThemeInput.OUTLINED}
              size={SizeInput.LARGE}
            />
          )}
        />
        <Controller
          name="password"
          rules={{ required: 'Введите пароль', minLength: { value: 3, message: 'Введите пароль не менее 3 символов' } }}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Пароль'
              theme={ThemeInput.OUTLINED}
              size={SizeInput.LARGE}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
          )}
        />
        <div className={styles.validationErrors}>
          {errors.email?<span>{errors.email.message}</span>: null}
          {errors.password?<span>{errors.password.message}</span>: null}
        </div>

        <Button className={styles.submitButton} size={SizeButton.MEDIUM} type='submit'>Войти</Button>
      </form>
    </div>
  );
};

export default LoginPage;

