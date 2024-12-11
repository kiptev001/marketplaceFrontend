'use client';
import React, { Dispatch, SetStateAction, SyntheticEvent, useRef, useState } from 'react';
import styles from './FileInput.module.scss';
import cn from 'clsx';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, SizeButton, ThemeButton } from '@/src/ui/shared/Button';

interface IFileInputProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  register?:any;
  setImages?:Dispatch<SetStateAction<Array<File> | null>>;
  images?: Array<File> | null;
}

const FileInput: React.FC<IFileInputProps> = ({ className, multiple = false, accept, register, setImages, images }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mainImage, setMainImage]=useState('');

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages && setImages(prevImages => [...(prevImages || []), ...Array.from(files)]);
    }
  };

  const handleDeletePicture = (index: number) => (e: SyntheticEvent) => {
    e.stopPropagation();
    setImages && setImages(prevImages => prevImages?.filter((_, i) => i !== index) || null);
  };

  const handleSetMainPicture = (index: number) => (e: SyntheticEvent) => {
    e.stopPropagation();
    setImages && setImages(prevImages => {
      if (!prevImages) return null;
      const newImages = [...prevImages];
      const [mainImage] = newImages.splice(index, 1);
      setMainImage(mainImage.name);
      return [mainImage, ...newImages];
    });
  };

  return (
    <div className={cn(styles.fileInputContainer, {}, [className])}>
      <div className={styles.selectedFiles}>
        {images && (
          Array.from(images).map((file, index) => (
            <div className={cn(styles.imagePreview,file.name===mainImage?styles.mainImage:null)} key={index} onClick={handleSetMainPicture(index)}>
              <Button theme={ThemeButton.CLEAR} size={SizeButton.SMALL} className={styles.deleteImageButton} onClick={handleDeletePicture(index)}>
                <ClearIcon/>
              </Button>
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
