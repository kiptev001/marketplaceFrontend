import classNames from 'clsx';
import cls from './Navbar.module.scss';
import { Button, ThemeButton } from '@/app/ui/shared/Button';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { AppLink } from '@/app/ui/shared/AppLink';
import App from 'next/app';

export interface NavbarProps {
  readonly className?: string;
}

function Navbar({ className }: NavbarProps) {
  // if (authData) {
  //   return (
  //     <div className={classNames(cls.navbar, {}, [className])}>
  //       <Button
  //         className={cls.links}
  //         theme={ThemeButton.CLEAR}
  //       >
  //         Выйти
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <AppLink href="/">
        <Favorite/>
      </AppLink>
      <AppLink href="/">
        <ShoppingCart/>
      </AppLink>
      <AppLink href="/registration">Вход и регистрация</AppLink>
      <AppLink href="/">Разместить объявление</AppLink>
    </div>
  );
}

export { Navbar };
