'use client';
import React, {
  memo,
  type InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
  type MutableRefObject
} from 'react';
import styles from './Input.module.scss';
import classNames from 'clsx';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'size'
>;

interface IInputProps extends HTMLInputProps {
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly theme?: ThemeInput;
  readonly size?: SizeInput;
}

export enum ThemeInput {
  OUTLINED = 'outlined',
  CLEAR = 'clear',
}

export enum SizeInput {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

const Input = (props: IInputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    theme = 'outlined',
    size = 'medium',
    ...rest
  } = props;

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      {...rest}
      className={classNames(styles.input, {[styles[theme]]: true,[styles[size]]: true,}, [className, styles.theme])}
      onChange={onChangeHandler}
      ref={inputRef}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default memo(Input) ;
