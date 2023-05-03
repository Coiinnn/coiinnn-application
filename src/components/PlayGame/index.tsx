import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components';

type TFieldValue = { value: number };
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS_MANTLE, contractAbi } from '@/contract';
import { decodeData, validateInputValue } from '@/utils';

import styles from './styles.module.scss';

export const PlayGame = () => {
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
      console.log(dataWait);
      for (const l of dataWait.logs) console.log(decodeData(l.data));
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
          placeholder={'10'}
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
