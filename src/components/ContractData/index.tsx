import React from 'react';
import { useBalance } from 'wagmi';

import { Button } from '@/components';
import { CONTRACT_ADDRESS_MANTLE, STORAGE_ADDRESS_MANTLE } from '@/contract';
import { useCoiinnnStorage, useLottery } from '@/hooks';

import styles from './styles.module.scss';

export const ContractData = () => {
  const { contractBalanceValue, contractBalanceSymbol, topUpBalance } =
    useLottery();
  const { storageBalanceValue, storageBalanceSymbol } = useCoiinnnStorage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <p className={styles.balance}>
          Lottery Balance: {contractBalanceValue} {contractBalanceSymbol}
        </p>
        <Button onClick={topUpBalance}>Donate Balance</Button>
      </div>
      <p className={styles.balance}>
        Storage Balance: {storageBalanceValue} {storageBalanceSymbol}
      </p>
    </div>
  );
};
