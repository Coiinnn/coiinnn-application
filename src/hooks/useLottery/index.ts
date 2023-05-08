'use client';

import { useMemo } from 'react';
import { prepareWriteContract, writeContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';

const useLottery = () => {
  const configContract = {
    address: CONTRACT_ADDRESS_MANTLE,
    formatUnits: 'ether',
    watch: true,
  };

  const addBalance = async (value: number) => {
    const _value = ethers.utils.parseEther(String(value));
    const config = await prepareWriteContract({
      address: CONTRACT_ADDRESS_MANTLE,
      abi: contractAbi,
      functionName: 'topUpBalance',
      args: [],
      overrides: {
        value: _value,
      },
    } as any);

    return await writeContract(config as any);
  };

  const { data: contractBalanceData } = useBalance(configContract as any);

  return useMemo(
    () => ({
      contractBalanceValue: contractBalanceData?.formatted || '0.0',
      contractBalanceSymbol: contractBalanceData?.symbol || 'BIT',
      topUpBalance: addBalance,
    }),
    [contractBalanceData],
  );
};

export default useLottery;
