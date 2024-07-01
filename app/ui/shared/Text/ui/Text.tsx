import React from 'react';
import styles from './Text.module.scss';
import classNames from 'clsx';

interface ITextProps {
  readonly className?: string;
  readonly title?: string;
  readonly text?: string;
  readonly theme?: string;
}

export enum ThemeText {
  TEXT = 'text',
  ERROR = 'error'
}

export default function Text(props: ITextProps) {
  const { title, text, className, theme = ThemeText.TEXT } = props;
  return (
    <div className={classNames(styles.Text, {}, [styles[theme], className])}>
      {title ? <div className={styles.title}>{title}</div> : null}
      {text ? <div className={styles.text}>{text}</div> : null}
    </div>
  );
}
