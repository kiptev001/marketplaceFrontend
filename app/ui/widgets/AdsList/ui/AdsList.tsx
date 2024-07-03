import styles from './AdsList.module.scss';
import { AdCard } from '@/app/ui/entities/Ad/ui/AdCard/index';

const ads = [
  {userId: 1,
    title: 'Крссовки женские',
    price: 2000,
    location: 'Patong',
    publicationDate: '20 июня 23:01',
    description: 'Мужские сандалии Adidas Производство - Вьетнам Качество Премиальное Размер с 41- 45',
    imagesUrls: ['https://80.img.avito.st/image/1/1.Sb4Zz7a45VcvZidSB7Zr93ht51Gnbmdfb2vnValm7V2v.D0Xun0kf5vqburg0LAEV1I8RY0Au8iep-ZIzYK8VgC8']
  },
  {userId: 1,
    title: 'Крссовки женские',
    price: 2000,
    location: 'Patong',
    publicationDate: '20 июня 23:01',
    description: 'Мужские сандалии Adidas Производство - Вьетнам Качество Премиальное Размер с 41- 45',
    imagesUrls: ['https://80.img.avito.st/image/1/1.Sb4Zz7a45VcvZidSB7Zr93ht51Gnbmdfb2vnValm7V2v.D0Xun0kf5vqburg0LAEV1I8RY0Au8iep-ZIzYK8VgC8']
  },
  {userId: 1,
    title: 'Крссовки женские',
    price: 2000,
    location: 'Patong',
    publicationDate: '20 июня 23:01',
    description: 'Мужские сандалии Adidas Производство - Вьетнам Качество Премиальное Размер с 41- 45',
    imagesUrls: ['https://80.img.avito.st/image/1/1.Sb4Zz7a45VcvZidSB7Zr93ht51Gnbmdfb2vnValm7V2v.D0Xun0kf5vqburg0LAEV1I8RY0Au8iep-ZIzYK8VgC8']
  },
  {userId: 1,
    title: 'Крссовки женские',
    price: 2000,
    location: 'Patong',
    publicationDate: '20 июня 23:01',
    description: 'Мужские сандалии Adidas Производство - Вьетнам Качество Премиальное Размер с 41- 45',
    imagesUrls: ['https://80.img.avito.st/image/1/1.Sb4Zz7a45VcvZidSB7Zr93ht51Gnbmdfb2vnValm7V2v.D0Xun0kf5vqburg0LAEV1I8RY0Au8iep-ZIzYK8VgC8']
  }
];

export default function AdsList(){
  return (
    <div className={styles.wrapper}>
      <div>Рекомендации для вас</div>
      <div className={styles.list}>
        {ads.map(ad=><AdCard key={ad.title} ad={ad}/>)}
      </div>
    </div>
  );
}
