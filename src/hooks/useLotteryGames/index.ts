'use client';

import { useState } from 'react';
import { useContractEvent } from 'wagmi';

import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';
import { fromHex } from '@/utils';
let nextId = 0;

type GameEventType = {
  id: number;
  owner: string;
  amount: number;
  result: 'win' | 'lose';
};
const useLotteryGames = () => {
  const [gameEvents, setGameEvents] = useState<Array<GameEventType>>([]);

  const addGameEvent = (event: GameEventType) => {
    setGameEvents((previousState) => [event, ...previousState]);
  };

  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'WinGame',
    listener(node, label) {
      const _label = label as { _hex: string };
      addGameEvent({
        id: ++nextId,
        owner: node as string,
        amount: fromHex(_label._hex) / Math.pow(10, 18),
        result: 'win',
      });
    },
  });
  useContractEvent({
    address: CONTRACT_ADDRESS_MANTLE,
    abi: contractAbi,
    eventName: 'LoseGame',
    listener(node, label) {
      const _label = label as { _hex: string };
      addGameEvent({
        id: ++nextId,
        owner: node as string,
        amount: fromHex(_label._hex) / Math.pow(10, 18),
        result: 'lose',
      });
    },
  });

  return gameEvents;
};

export default useLotteryGames;
