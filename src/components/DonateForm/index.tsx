'use client';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import useLottery from '@/hooks/useLottery';
import { validateInputValueMoreThanZero } from '@/utils';

import styles from './styles.module.scss';

type TFieldValue = { value: number };

const DonateForm = () => {
  const { handleSubmit, control, setError, clearErrors } = useForm<TFieldValue>(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {},
    },
  );

  const { contractBalanceValue, contractBalanceSymbol, topUpBalance } =
    useLottery();

  const onSubmit = useCallback(
    async (data: TFieldValue) => {
      try {
        const dataWait = await topUpBalance(data.value);
        if (dataWait.hash) {
          toast.success(<Toast hash={dataWait.hash} />);
        }
      } catch (error: any) {
        toast.error(error.message || 'error');
      }
    },
    [clearErrors, setError],
  );

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Donate any amount BIT to our game!</p>
      <p className={styles.text_small}>
        Lottery Balance: {contractBalanceValue} {contractBalanceSymbol}
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          type={'number'}
          disabled={false}
          placeholder={'Ex: 10'}
          rules={{
            required: 'Should be more than 0',
            validate: validateInputValueMoreThanZero,
          }}
          name={'value'}
          label={'Enter amount'}
        />
        <Button submit>Donate</Button>
      </form>
    </div>
  );
};

const Toast = ({ hash }: { hash: string }) => {
  return (
    <div className={styles.toast_wrapper}>
      <p>Thanks for Donation!</p>
      <a
        href={`https://explorer.testnet.mantle.xyz/tx/${hash}`}
        target={'_blank'}
        rel="noreferrer"
      >
        Check transaction
      </a>
    </div>
  );
};

export default DonateForm;
