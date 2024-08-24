import {
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import cls from './Modal.module.scss';
import classNames from 'clsx';

export interface ModalProps {
  readonly isOpen?: boolean;
  readonly className?: string;
  readonly children?: ReactNode;
  readonly onClose?: () => void;
  readonly lazy?: boolean;
}

const Modal = (props: ModalProps) => {
  const { children, className, isOpen, onClose, lazy } = props;
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      if (onClose) {
        setIsClosing(true);
        timeRef.current = setTimeout(() => {
          onClose();
          setIsClosing(false);
        }, 200);
      }
    },
    [onClose]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (onClose) {
          setIsClosing(true);
          timeRef.current = setTimeout(() => {
            onClose();
            setIsClosing(false);
          }, 200);
        }
      }
    },
    [onClose]
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      clearTimeout(timeRef.current);
      removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods = {
    [cls.opened]: isOpen,
    [cls.closing]: isClosing
  };

  if (lazy && !isMounted) return null;

  return (
    <div className={classNames(cls.modal, mods, [className])}>
      <div className={cls.overlay} onClick={closeHandler}>
        <div className={cls.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
