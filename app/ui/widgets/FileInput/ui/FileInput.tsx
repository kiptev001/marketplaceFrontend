'use client';
import React, { useState, useRef } from 'react';
import styles from './FileInput.module.scss';
import cn from 'clsx';
import Image from 'next/image';

interface IFileInputProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  register?:any;
}

const FileInput: React.FC<IFileInputProps> = ({ className, multiple = false, accept, register }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const inputRef = useRef();

  return (
    <div className={cn(styles.fileInputContainer,{},[className])}>
      <input
        type="file"
        ref={inputRef}
        multiple={multiple}
        accept={accept}
        className={styles.fileInput}
        onInput={(e)=>setSelectedFiles(e.target.files)}
        {...register}
      />
      {selectedFiles && (
        <div className={styles.selectedFiles}>Selected files
          {Array.from(selectedFiles).map((file, index) => (
            <Image width={100} height={100} alt='Image' src={URL.createObjectURL(file)} className={styles.selectedFile} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInput;
