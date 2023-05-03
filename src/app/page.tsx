'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Web3Button } from '@web3modal/react';

import {
  ContractData,
  EventsData,
  LotteryBalance,
  PlayGame,
} from '@/components';

import Coin from '../../public/assets/coin.png';

import styles from './page.module.css';
const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Link href={'/'}>
          <Image src={Coin} alt={'Coin'} />
          Lottery
        </Link>
        <div>
          <Web3Button />
        </div>
      </div>
      <ContractData />

      <div className={styles.columns}>
        <div className={styles.center}>
          {/*<LotteryBalance />*/}
          <PlayGame />
        </div>
        <EventsData />
      </div>
    </main>
  );
};

export default Home;
