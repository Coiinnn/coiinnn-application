import { useMemo } from 'react';
import { useBalance } from 'wagmi';

import { CONTRACT_ADDRESS_MANTLE, contractAbi, STORAGE_ADDRESS_MANTLE } from '@/contract';

export const useCoiinnnStorage = () => {
  const config = {
    address: STORAGE_ADDRESS_MANTLE,
    formatUnits: 'ether',
    watch: true,
  };



  const { data: storageBalanceData } = useBalance(config as any);

  return useMemo(
    () => ({
      storageBalanceValue: storageBalanceData?.formatted,
      storageBalanceSymbol: storageBalanceData?.symbol,
    }),
    [storageBalanceData],
  );
};
