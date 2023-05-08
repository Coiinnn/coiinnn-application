'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button';
import useLottery from '@/hooks/useLottery';

import styles from './styles.module.scss';

const SafeData = () => {
  const { contractBalanceValue, contractBalanceSymbol } = useLottery();
  const { push } = useRouter();

  const go = (url: string) => {
    return async () => await push(url);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Coiinnn Storage</p>
      <p className={styles.data}>
        {contractBalanceValue} {contractBalanceSymbol}
      </p>
      <div className={styles.buttons}>
        <Button onClick={go('/play')}>Try it now!</Button>
        <Button onClick={go('/donate')}>Donate</Button>
      </div>
    </div>
  );
};

export default SafeData;
