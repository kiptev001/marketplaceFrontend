import React, { type FC } from 'react';
import Link, { LinkProps } from 'next/link';
import cls from './AppLink.module.scss';
import classNames from 'clsx';

export enum ThemeAppLink {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red'
}

export interface AppLinkProps extends LinkProps {
  readonly className?: string;
  readonly theme?: ThemeAppLink;
  children?: React.ReactNode
}

const AppLink: FC<AppLinkProps> = props => {
  const {
    children,
    className,
    href,
    theme = ThemeAppLink.PRIMARY,
    ...otherProps
  } = props;
  return (
    <Link
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      href={href}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

export { AppLink };
