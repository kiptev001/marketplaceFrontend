import React from 'react';
import cls from './PageError.module.scss';
import classNames from 'clsx';
import { Button } from '@/app/ui/shared/Button/index';

export interface PageErrorProps {
  readonly className?: string;
}

function PageError({ className }: PageErrorProps) {
  return (
    <div className={classNames(cls.pageError, {}, [className])}>

      <Button
        onClick={() => {
          location.reload();
        }}
      >
      </Button>

    </div>
  );
}

export { PageError };
