import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import AuthButton from '@/components/AuthButton';

import Coin from '../../../public/assets/coin.png';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href={'/'} className={styles.link}>
        <Image src={Coin} alt={'Coin'} />
        Lottery
      </Link>
      <Link href={'play'}>Play!</Link>
      <Link href={'donate'}>Donate</Link>
      <div>
        <AuthButton />
      </div>
    </div>
  );
};

export default Header;
