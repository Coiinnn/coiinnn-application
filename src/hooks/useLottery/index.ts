import { useMemo } from 'react';
import { ethers } from 'ethers';
import { useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi';

import {
  CONTRACT_ADDRESS_MANTLE,
  contractAbi,
  STORAGE_ADDRESS_MANTLE,
} from '@/contract';

export const useLottery = () => {
  const config = {
    address: CONTRACT_ADDRESS_MANTLE,
    formatUnits: 'ether',
    watch: true,
  };

  const { config: topUpConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    functionName: 'topUpBalance',
    args: [],
    overrides: {
      value: ethers.utils.parseEther('50'),
    },
  } as any);
  const { write: addBalance } = useContractWrite(topUpConfig as any);

  const { data: contractBalanceData } = useBalance(config as any);

  return useMemo(
    () => ({
      contractBalanceValue: contractBalanceData?.formatted,
      contractBalanceSymbol: contractBalanceData?.symbol,
      topUpBalance: addBalance,
    }),
    [contractBalanceData],
  );
};
