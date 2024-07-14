'use client';
import classNames from 'clsx';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/app/ui/shared/Button';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { AppLink, ThemeAppLink } from '@/app/ui/shared/AppLink';
import App from 'next/app';
import api from '@/app/src/http';

export interface NavbarProps {
  readonly className?: string;
}

function Navbar({ className }: NavbarProps) {
  const handleLogout = async () =>{
    try {
      const response = await api.post('/users/logout');
      localStorage.removeItem('token');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <AppLink href="/">
        <Favorite/>
      </AppLink>
      <AppLink href="/">
        <ShoppingCart/>
      </AppLink>
      <AppLink theme={ThemeAppLink.SECONDARY} href="/registration">Вход и регистрация</AppLink>
      <AppLink theme={ThemeAppLink.SECONDARY} href="/createAd">Разместить объявление</AppLink>
      <Button
        className={cls.links}
        theme={ThemeButton.CLEAR}
        onClick={handleLogout}
      >
        Выйти
      </Button>
    </div>
  );
}

export { Navbar };
