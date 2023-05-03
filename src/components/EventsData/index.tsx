import React, { useState } from 'react';
import { useContractEvent, useContractReads } from 'wagmi';

import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';
import { fromHex, generateKey } from '@/utils';

import styles from './styles.module.scss';

let nextId = 0;

type GameEventType = {
  id: number;
  owner: string;
  amount: number;
  result: 'win' | 'lose';
};

export const EventsData = () => {
  const [gameEvents, setGameEvents] = useState<Array<GameEventType>>([]);

  const addGameEvent = (event: GameEventType) => {
    setGameEvents((previousState) => [event, ...previousState]);
  };

  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'WinGame',
    listener(node, label, q) {
      console.log({ node, label, q, result: 'win' });
      addGameEvent({
        id: ++nextId,
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
        id: ++nextId,
        owner: node,
        amount: fromHex(label._hex) / Math.pow(10, 18),
        result: 'lose',
      });
    },
  });

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Games:</p>
      {gameEvents.map((event) => {
        return (
          <div
            className={`${styles.card} ${
              event.result === 'win' ? styles.win : styles.lose
            }`}
            key={event.id}
          >
            <div>Owner: {event.owner}</div>
            <span>
              {event.result === 'win'
                ? `+ ${(event.amount * 0.95).toFixed(2)}`
                : `- ${event.amount.toFixed(2)}`}
              &nbsp;BIT
            </span>
          </div>
        );
      })}
    </div>
  );
};
