import React, { type ButtonHTMLAttributes, type FC } from 'react';
import styles from './MyButton.module.scss';
import classNames from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly className?: string;
  readonly theme?: ThemeButton;
  readonly size?: SizeButton;
  readonly disabled?: boolean;
}

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum SizeButton {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

function Button(props:ButtonProps){
  const {
    className,
    children,
    theme = ThemeButton.BACKGROUND,
    size = SizeButton.MEDIUM,
    disabled,
    ...otherProps
  } = props;

  const mods = {
    [styles[theme]]: true,
    [styles[size]]: true,
    [styles.disabled]: disabled
  };

  return (
    <button
      className={classNames(styles.btn, mods, [className])}
      disabled={disabled}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export {Button};
