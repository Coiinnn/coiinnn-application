import React from 'react';
import {
  getContract,
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { ethers } from 'ethers';
import {
  useAccount,
  useBalance,
  useContractEvent,
  usePrepareContractWrite,
} from 'wagmi';

import { Button, Input } from '@/components';
import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';

import styles from './styles.module.scss';
export const LotteryBalance = () => {
  const contract = getContract({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
  });
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { data: userBalance } = useBalance({
    address,
    formatUnits: 'ether',
    watch: true,
  });

  const topUpBalance = async () => {
    const config = await prepareWriteContract({
      address: CONTRACT_ADDRESS_MANTLE,
      abi: contractAbi,
      functionName: 'topUpBalance',
      args: [],
      overrides: {
        value: ethers.utils.parseEther('50'),
      },
    });
    const dataContractTopUp = await writeContract(config);
    console.log(dataContractTopUp);
  };

  const play = async () => {
    const config = await prepareWriteContract({
      address: CONTRACT_ADDRESS_MANTLE,
      abi: contractAbi,
      functionName: 'play',
      args: [],
      overrides: {
        value: ethers.utils.parseEther('1'),
      },
    });
    const dataPlay = await writeContract(config);
    const dataWait = await waitForTransaction({
      hash: dataPlay.hash,
    });
    console.log(dataWait);
    for (const l of dataWait.logs) decodeData(l.data);
  };

  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'StartGame',
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });
  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'LoseGame',
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });
  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'WinGame',
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });

  const decodeData = (dataInput: string) => {
    const decodedEvent = ethers.utils.defaultAbiCoder.decode(
      ['string', 'uint256'],
      dataInput,
    );
    // console decoded data
    console.log(decodedEvent);
  };

  return (
    <div className={styles.container}>
      <p>
        Your Balance: {userBalance?.formatted} {userBalance?.symbol}
      </p>
      <div className={styles.divider} />
      <div className={styles.buttons}>
        <Button onClick={topUpBalance}>Top up balance</Button>
        <Button onClick={play}>Play</Button>
      </div>
    </div>
  );
};
