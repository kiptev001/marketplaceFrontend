'use client';
import classNames from 'clsx';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/app/ui/shared/Button';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { AppLink, ThemeAppLink } from '@/app/ui/shared/AppLink';
import { toast } from 'react-toastify';
import api from '@/app/src/http';
import { useAuth } from '@/app/ui/providers/AuthProvider';

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
      toast.success('Success logout', {position:'bottom-left'});
    } catch (error) {
      toast.error('Error logout', {position:'bottom-left'});
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
      {!auth.user && <AppLink theme={ThemeAppLink.SECONDARY} href="/registration">Вход и регистрация</AppLink>}
      <AppLink theme={ThemeAppLink.SECONDARY} href="/createAd">Разместить объявление</AppLink>
      <div>{auth.user?.email}</div>
      {auth.user && <Button
        className={cls.links}
        theme={ThemeButton.CLEAR}
        onClick={handleLogout}
      >
        Выйти
      </Button>}
    </div>
  );
}

export { Navbar };
