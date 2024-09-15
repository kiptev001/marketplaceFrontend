'use client';
import classNames from 'clsx';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/app/ui/shared/Button';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { AppLink, ThemeAppLink } from '@/app/ui/shared/AppLink';
import { toast } from 'react-toastify';
import api from '@/app/src/http';
import { useAuth } from '@/app/ui/providers/AuthProvider';
import { SandwichMenu } from '@/app/ui/shared/SandwichMenu/index';
import { SandwichMenuItem } from '@/app/ui/shared/SandwichMenu/ui/SandwichMenu';

export interface NavbarProps {
  readonly className?: string;
}

function Navbar({ className }: NavbarProps) {
  const auth = useAuth();

  const handleLogout = async () =>{
    try {
      await api.post('/users/logout');
      localStorage.removeItem('token');
      auth.logout();
      toast.success('Success logout', { position: 'bottom-left' });
    } catch (error) {
      toast.error('Error logout', { position: 'bottom-left' });
    }
  };

  const authItems:Array<SandwichMenuItem> = [
    { 
      href: '/',
      text: 'На главную'
    },
    {
      text: 'Выйти',
      onClick: handleLogout,
    },
    {
      text: 'Мои объявления',
      href: '/myAds'
    }
  ];

  const unAuthItems:Array<SandwichMenuItem> = [
    { 
      href: '/',
      text: 'На главную'
    },
    {
      text: 'Войти',
      href: '/login'
    }
  ];

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <AppLink href="/">
        <Favorite/>
      </AppLink>
      {!auth.user && <AppLink theme={ThemeAppLink.SECONDARY} href="/registration">Вход и регистрация</AppLink>}
      <AppLink theme={ThemeAppLink.SECONDARY} href="/createAd">Разместить объявление</AppLink>
      <SandwichMenu title={auth.user?.email} items={auth.user?authItems:unAuthItems}/>
    </div>
  );
}

export { Navbar };
