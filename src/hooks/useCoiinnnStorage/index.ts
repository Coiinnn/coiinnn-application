'use client';

import { useMemo } from 'react';
import { useBalance } from 'wagmi';

import { STORAGE_ADDRESS_MANTLE } from '@/contract';

const useCoiinnnStorage = () => {
  const config = {
    address: STORAGE_ADDRESS_MANTLE,
    formatUnits: 'ether',
    watch: true,
  };

  const { data: storageBalanceData } = useBalance(config as any);

  return useMemo(
    () => ({
      storageBalanceValue: storageBalanceData?.formatted || '0.0',
      storageBalanceSymbol: storageBalanceData?.symbol,
    }),
    [storageBalanceData],
  );
};

export default useCoiinnnStorage;
