import React, { FC } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

import styles from './styles.module.scss';

type TInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  placeholder: string;
  label: string;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email' | 'tel' | 'date';
  control?: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export const Input: FC<TInput> = ({
  control,
  name,
  type = 'text',
  rules,
  label,
  disabled,
  placeholder,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    rules,
    control,
  });
  const hasError = isTouched && invalid && !!error?.message;
  return (
    <div>
      <label htmlFor="input" className={styles.label}>
        {label}
      </label>
      <input
        ref={ref}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${styles.inp} ${hasError && styles.error}`}
        {...rest}
      />
      <div className={styles.error_message}>{error?.message}</div>
    </div>
  );
};
