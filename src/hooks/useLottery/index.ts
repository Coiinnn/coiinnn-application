import { useMemo } from 'react';
import { useBalance } from 'wagmi';

import { CONTRACT_ADDRESS_MANTLE } from '@/contract';

export const useLottery = () => {
  const config = {
    address: CONTRACT_ADDRESS_MANTLE,
    formatUnits: 'ether',
    watch: true,
  };

  const { data: contractBalanceData } = useBalance(config as any);

  return useMemo(
    () => ({
      contractBalanceValue: contractBalanceData?.formatted,
      contractBalanceSymbol: contractBalanceData?.symbol,
    }),
    [contractBalanceData],
  );
};
