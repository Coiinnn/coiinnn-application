'use client';

import React, { FC, PropsWithChildren } from 'react';
import {
  Chain,
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';

const BIT = {
  name: 'BIT',
  symbol: 'BIT',
  decimals: 18,
};
const MantleRPCUrl = 'https://rpc.testnet.mantle.xyz';
const MantleChain: Chain = {
  id: 5001,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  nativeCurrency: BIT,
  rpcUrls: {
    main: {
      http: [MantleRPCUrl],
      webSocket: [MantleRPCUrl],
    },
    default: {
      http: [MantleRPCUrl],
      webSocket: [MantleRPCUrl],
    },
    public: {
      http: [MantleRPCUrl],
      webSocket: [MantleRPCUrl],
    },
  },

  testnet: true,
};

const chains = [MantleChain];
const projectId = 'ed89cd8a4489e758f8067bd8b8427844';

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default Web3Provider;
