'use client';
import React, {
  type InputHTMLAttributes,
  type MutableRefObject,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState
} from 'react';
import styles from './Input.module.scss';
import classNames from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

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
  readonly register?:UseFormRegisterReturn
  readonly button?: ReactNode
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
    register = {},
    button,
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
    <div className={styles.InputWrapper}>
      <input
        {...rest}
        className={classNames(styles.input, { [styles[theme]]: true,[styles[size]]: true, }, [className, styles.theme])}
        onChange={onChangeHandler}
        ref={inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        {...register}
      />
      {button && <div className={styles.ActionButton}>{button}</div>}
    </div>
  );
};

export default memo(Input) ;
