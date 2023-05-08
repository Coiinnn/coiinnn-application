import React from 'react';
import Image from 'next/image';

import DonateForm from '@/components/DonateForm';

import MoneyImage from '../../../public/assets/money.webp';

import styles from './page.module.css';
const Donate = () => {
  return (
    <div className={styles.wrapper}>
      <DonateForm />
      <div className={styles.image_wrapper}>
        <Image src={MoneyImage} alt={'Money Bag'} fill />
      </div>
    </div>
  );
};

export default Donate;
