import React, { ReactNode, useState, useEffect, useRef } from 'react';
import styles from './SandwichMenu.module.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface SandwichMenuProps {
  title?: string;
  items: Array<SandwichMenuItem>;
}

export interface SandwichMenuItem {
  text?: string;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const SandwichMenu = ({ items = [], title }: SandwichMenuProps) => {
  const [opened, setOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpened(!opened);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    if (opened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [opened]);

  return (
    <div className={styles.sandwichMenu} ref={menuRef}>
      <div className={styles.menuTitle} onClick={toggleMenu}>
        {title}
        {opened ? <ArrowDropUpIcon/> : <ArrowDropDownIcon />}
      </div>
      <ul className={`${styles.menuList} ${opened ? styles.open : ''}`}>
        {items.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            {item.href ? (
              <a href={item.href} className={styles.menuLink} onClick={item.onClick}>
                {item.text}
              </a>
            ) : (
              <button className={styles.menuButton} onClick={item.onClick}>
                {item.text}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SandwichMenu;
