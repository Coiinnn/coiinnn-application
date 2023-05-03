import React from 'react';

import { useLottery } from '@/hooks';

import styles from './styles.module.scss';

export const ContractData = () => {
  const { contractBalanceValue, contractBalanceSymbol } = useLottery();

  return (
    <div className={styles.wrapper}>
      <p className={styles.balance}>
        Lottery Balance: {contractBalanceValue} {contractBalanceSymbol}
      </p>
    </div>
  );
};
