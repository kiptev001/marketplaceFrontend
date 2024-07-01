'use client';
import { AppLink,ThemeAppLink } from '@/app/ui/shared/AppLink/';
import { Button, SizeButton, ThemeButton } from '@/app/ui/shared/Button';
import { Input,SizeInput, ThemeInput } from '@/app/ui/shared/Input/';
import { Loader } from '@/app/ui/shared/Loader';
import { Modal } from '@/app/ui/shared/Modal';
import { useState } from 'react';
import { Text, ThemeText } from '@/app/ui/shared/Text';

export default function Page() {
  const [isOpen,setIsOpen]=useState(true);
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
      <div style={{display:'flex', flexDirection:'row',border:'solid 2px black'}} >
        <AppLink href={'/'} theme={ThemeAppLink.PRIMARY}>PRIMARY</AppLink>
        <AppLink href={'/'} theme={ThemeAppLink.RED}>PRIMARY</AppLink>
        <AppLink href={'/'} theme={ThemeAppLink.SECONDARY}>PRIMARY</AppLink>
      </div>
      <Input size={SizeInput.SMALL} theme={ThemeInput.CLEAR} onChange={(e)=>console.log(e)}/>
      <Input size={SizeInput.MEDIUM} theme={ThemeInput.OUTLINED} onChange={(e)=>console.log(e)}/>
      <Input size={SizeInput.LARGE} theme={ThemeInput.OUTLINED} onChange={(e)=>console.log(e)}/>
      <Loader />
      <Button size={SizeButton.LARGE} theme={ThemeButton.BACKGROUND}>LARGE BG</Button>
      <div style={{display:'flex', flexDirection:'row',border:'solid 2px black'}}>
        <Button onClick={()=>setIsOpen(prev=>!prev)} size={SizeButton.SMALL} theme={ThemeButton.BACKGROUND_INVERTED}>Small IBG</Button>
        <Button size={SizeButton.MEDIUM} theme={ThemeButton.BACKGROUND_INVERTED}>MEDIUM IBG</Button>
        <Button size={SizeButton.LARGE} theme={ThemeButton.BACKGROUND_INVERTED}>LARGE IBG</Button>
      </div>
      <div style={{display:'flex', flexDirection:'row',border:'solid 2px black'}}>
        <Text text='Text' title='Title' theme={ThemeText.ERROR}/>
        <Text text='Text' title='Title' theme={ThemeText.TEXT}/>
      </div>
    </div>
  );
}
