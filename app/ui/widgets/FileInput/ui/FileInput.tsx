'use client';
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './FileInput.module.scss';
import cn from 'clsx';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Button } from '@/app/ui/shared/Button';
import { ImagesearchRollerRounded } from '@mui/icons-material';

interface IFileInputProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  register?:any;
  setImages?:Dispatch<SetStateAction<FileList | null>>;
  images?: FileList;
}

const FileInput: React.FC<IFileInputProps> = ({ className, multiple = false, accept, register, setImages, images }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages && setImages(prevImages => [...(prevImages || []), ...Array.from(files)]);
    }
  };

  return (
    <div className={cn(styles.fileInputContainer, {}, [className])}>
      <div className={styles.selectedFiles}>
        {images && (
          Array.from(images).map((file, index) => (
            <div className={styles.imagePreview} key={index}>
              <Image fill alt='Image' src={URL.createObjectURL(file)} className={styles.selectedFile} />
            </div>
          )))}
      </div>
      <Button className={styles.inputButton} onClick={handleClick}>Добавить фотографию</Button>
      <input
        name='images'
        type="file"
        multiple={multiple}
        accept={accept}
        className={styles.fileInput}
        onInput={handleFileChange}
        ref={(e) => {
          inputRef.current = e;
          register;
        } } />
    </div>


  );
};

export default FileInput;
