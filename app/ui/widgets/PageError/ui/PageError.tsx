import React from 'react';
import cls from './PageError.module.scss';
import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { MyButton } from 'shared/ui/Button';
import { LanguageSwitcher } from 'widget/LanguageSwitcher';

export interface PageErrorProps {
  readonly className?: string;
}

function PageError({ className }: PageErrorProps) {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.pageError, {}, [className])}>
      {t('Что-то пошло не так')}

      <MyButton
        onClick={() => {
          location.reload();
        }}
      >
        {t('Обновить страницу')}
      </MyButton>

      <LanguageSwitcher />
    </div>
  );
}

export { PageError };
