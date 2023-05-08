import React from 'react';
import Image from 'next/image';

import SafeData from '@/components/SafeData';

import SafeImage from '../../public/assets/safe.webp';

import styles from './page.module.css';
const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.image_wrapper}>
        <Image
          src={SafeImage}
          alt={'Coiin Safe'}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <SafeData />
    </main>
  );
};

export default Home;
