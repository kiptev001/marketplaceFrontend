'use client';
import React, { useState } from 'react';
import styles from './ProfilePage.module.scss';
import { Button, SizeButton, ThemeButton } from '../ui/shared/Button';
import ProfileTab from './tabs/ProfileTab';
import MyAdsTab from './tabs/MyAdsTab';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.page}>
      <div className={styles.buttons}>
        <Button
          onClick={() => handleTabClick('profile')}
          className={`${activeTab === 'profile' ? styles.active : ''} ${styles.button}`}
          size={SizeButton.MEDIUM}
          theme={activeTab === 'profile' ? ThemeButton.SELECTED:ThemeButton.BACKGROUND}
        >
          Профиль пользователя
        </Button>
        <Button
          onClick={() => handleTabClick('myAds')}
          className={activeTab === 'myAds' ? styles.active : ''}
          size={SizeButton.MEDIUM}
          theme={activeTab === 'myAds' ? ThemeButton.SELECTED:ThemeButton.BACKGROUND}
        >
          Мои объявления
        </Button>
      </div>

      <div className={styles.tabs}>
        {activeTab === 'profile' && <ProfileTab/>}
        {activeTab === 'myAds' && <MyAdsTab />}
      </div>
    </div>
  );
};

export default ProfilePage;
