'use client';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type TFieldValue = { value: number };
import toast from 'react-hot-toast';
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { ethers } from 'ethers';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';
import { decodeData, validateInputValue } from '@/utils';

import styles from './styles.module.scss';

const PlayGame = () => {
  const {
    handleSubmit,
    control,
    formState: {
      isValid,
      isSubmitting,
      isSubmitSuccessful,
      errors,
      submitCount,
    },
    setError,
    clearErrors,
  } = useForm<TFieldValue>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = useCallback(
    async (data: TFieldValue) => {
      try {
        const config = await prepareWriteContract({
          address: CONTRACT_ADDRESS_MANTLE,
          abi: contractAbi,
          functionName: 'play',
          args: [],
          overrides: {
            value: ethers.utils.parseEther(String(data.value)),
          },
        });
        const dataPlay = await writeContract(config);
        const dataWait = await waitForTransaction({
          hash: dataPlay.hash,
        });
        if (dataWait.transactionHash) {
          toast.success(
            <a
              href={`https://explorer.testnet.mantle.xyz/tx/${dataWait.transactionHash}`}
              target={'_blank'}
              rel="noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              Check transaction
            </a>,
          );
        }
      } catch (error: any) {
        toast.error(error.message || 'error');
      }
    },
    [clearErrors, setError],
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          type={'number'}
          disabled={false}
          placeholder={'Ex: 10'}
          rules={{
            required: 'Should be between 0 and 10',
            validate: validateInputValue,
          }}
          name={'value'}
          label={'Enter amount'}
        />
        <Button submit variant={'filled'}>
          Play
        </Button>
      </form>
    </div>
  );
};

export default PlayGame;
