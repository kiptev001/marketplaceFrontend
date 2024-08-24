import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Dropdown.module.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IDropdownProps<T extends string> {
  className?: string;
  optionsEnum: { [key: string]: T };
  register?: any;
}

const Dropdown = <T extends string>({ className, optionsEnum, register, ...restProps }: IDropdownProps<T>) => {
  const options = Object.keys(optionsEnum) as T[];

  return (
    <div className={styles.dropdown}>
      <select {...restProps} className={`${styles.select} ${className}`} {...register}>
        {options.map(option => (
          <option key={option} value={optionsEnum[option]}>
            {optionsEnum[option]}
          </option>
        ))}
      </select>
      <ArrowDropDownIcon className={styles.icon}/>
    </div>
  );
};

export default Dropdown;
