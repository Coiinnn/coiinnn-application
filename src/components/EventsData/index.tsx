import React, { useState } from 'react';
import { s } from 'abitype/dist/abi-78346466';
import { useContractEvent, useContractReads } from 'wagmi';

import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';
import { fromHex, generateKey } from '@/utils';

import styles from './styles.module.scss';

type GameEventType = {
  owner: string;
  amount: number;
  result: 'win' | 'lose';
};

export const EventsData = () => {
  const [gameEvents, setGameEvents] = useState<Array<GameEventType>>([]);

  const addGameEvent = (event: GameEventType) => {
    setGameEvents((previousState) => [...previousState, event]);
  };

  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'WinGame',
    listener(node, label, q) {
      console.log({ node, label, q, result: 'win' });
      addGameEvent({
        owner: node,
        amount: fromHex(label._hex) / Math.pow(10, 18),
        result: 'win',
      });
    },
  });
  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'LoseGame',
    listener(node, label, q) {
      console.log({ node, label, q, result: 'lose' });
      addGameEvent({
        owner: node,
        amount: fromHex(label._hex) / Math.pow(10, 18),
        result: 'lose',
      });
    },
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Games:</p>
      {gameEvents.map((event) => (
        <div className={styles.card} key={generateKey(event.owner)}>
          <div>Owner: {event.owner}</div>
          <div>Amount: {event.amount}</div>
          <div>Result: {event.result}</div>
        </div>
      ))}
    </div>
  );
};
