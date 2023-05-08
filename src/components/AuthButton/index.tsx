'use client';

import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';

import { Button } from '@/components/Button';
import { startAndEnd } from '@/utils';

import styles from './styles.module.scss';
const AuthButton = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleClick = () => setToggle(!toggle);

  return (
    <div className={styles.wrapper}>
      {address ? (
        <>
          <p className={styles.address} onClick={toggleClick}>
            {startAndEnd(address, 6)}
          </p>
          {toggle && (
            <div className={styles.drop_box}>
              <a
                href={`https://explorer.testnet.mantle.xyz/address/${address}`}
                target={'_blank'}
                className={styles.link}
                rel="noreferrer"
              >
                View on Mantle Scan
              </a>
              <Button onClick={disconnect}>Disconnect Wallet</Button>
            </div>
          )}
        </>
      ) : (
        <Button onClick={open}>Connect Wallet</Button>
      )}
    </div>
  );
};

export default AuthButton;
