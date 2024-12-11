'use client';

import { AppLink, ThemeAppLink } from '@/src/ui/shared/AppLink';
import { Button, ThemeButton } from '@/src/ui/shared/Button';
import st from './uikit.module.scss';
import { Dropdown } from '@/src/ui/shared/Dropdown';
import { Input, ThemeInput } from '@/src/ui/shared/Input';
import { Loader } from '@/src/ui/shared/Loader';
import { Modal } from '@/src/ui/shared/Modal';
import { useState } from 'react';
import { SandwichMenu } from '@/src/ui/shared/SandwichMenu';
import { Text, ThemeText } from '@/src/ui/shared/Text';
import cn from 'clsx';

const UIKITPage = ()=>{
  const [isOpen, setIsOpen]= useState(false);
  return(
    <div className={st.Page}>
      <div className={st.Section}>
        <div>Links: </div>
        <AppLink theme={ThemeAppLink.PRIMARY} href={'/'}>Primary Link</AppLink>
        <AppLink theme={ThemeAppLink.SECONDARY} href={'/'}>Secondary Link</AppLink>
        <AppLink theme={ThemeAppLink.RED} href={'/'}>Red Link</AppLink>
      </div>
      <div className={st.Section}>
        <span>Buttons: </span>
        <Button className={st.Button} theme={ThemeButton.BACKGROUND}>Background Button</Button>
        <Button className={st.Button} theme={ThemeButton.BACKGROUND_INVERTED}>Background Inverted Button</Button>
        <Button className={st.Button} theme={ThemeButton.CLEAR}>Clear Button</Button>
        <Button className={st.Button} theme={ThemeButton.OUTLINE}>Outline Button</Button>
        <Button className={st.Button} theme={ThemeButton.RED}>Red Button</Button>
        <Button className={st.Button} theme={ThemeButton.SELECTED}>Selected Button</Button>
      </div>

      <div className={st.Section}>
        <div>Dropdown: </div>
        <Dropdown
          className={st.Dropdown}
          optionsEnum={
            {
              'Option 1': 'Option 1',
              'Option 2': 'Option 2',
              'Option 3': 'Option 3',
              'Option 4': 'Option 4',
            }}/>
      </div>

      <div className={st.Section}>
        <div>Inputs: </div>
        <Input theme={ThemeInput.OUTLINED} placeholder='Outlined input'/>
        <Input theme={ThemeInput.CLEAR} placeholder='Clear input'/>
      </div>

      <div className={st.Section}>
        <div>Loader:</div>
        <Loader className={st.Loader}/>
      </div>

      <div className={st.Section}>
        <div>Modal:</div>
        <Button onClick={()=>setIsOpen(prev=>!prev)}>Open modal</Button>
        <Modal onClose={()=>setIsOpen(prev=>!prev)} isOpen={isOpen}>Modal content</Modal>
      </div>

      <div className={st.Section}>
        <div>Sandwich menu:</div>
        <SandwichMenu 
          title='Options' 
          items={
            [
              { text: 'Option 1' },
              { text: 'Option 2' },
              { text: 'Option 3' }
            ]
          }/>
      </div>

      <div className={st.Section}>
        <div>Text:</div>
        <Text text='Text item'/>
        <Text text='Text item with title' title='Title'/>
        <Text theme={ThemeText.ERROR} text='Error text item'/>
        <Text theme={ThemeText.ERROR} text='Error text item with title' title='Title'/>
      </div>

      <div className={st.Section}>
        <div>Colors</div>
        <div className={cn(st.Color, st.Primary)}>Primary color</div>
        <div className={cn(st.Color, st.PrimaryTinted)}>Primary color tinted</div>
        <div className={cn(st.Color, st.InvertedPrimary)}>Inverted Primary color</div>

        <div className={cn(st.Color, st.Secondary)}>Secondary color</div>
        <div className={cn(st.Color, st.InvertedSecondary)}>Inverted Secondary color</div>

        <div className={cn(st.Color, st.Selected)}>Selected color</div>
        <div className={cn(st.Color, st.SelectedTinted)}>Selected color tinted</div>

        <div className={cn(st.Color, st.LightGrey)}>Light grey color</div>
        <div className={cn(st.Color, st.SuperLightGrey)}>Super light grey</div>

        <div className={cn(st.Color, st.Background)}>Background color</div>
        <div className={cn(st.Color, st.InvertedBackground)}>Inverted Background color</div>

        <div className={cn(st.Color, st.LightRed)}>Light red color</div>
        <div className={cn(st.Color, st.DarkRed)}>Dark red color</div>
      </div>
    </div>
  );
};

export default UIKITPage;
