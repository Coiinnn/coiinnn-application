/* eslint-disable unicorn/prefer-date-now */
import { Result } from '@ethersproject/abi';
import { ethers } from 'ethers';

export const decodeData = (dataInput: string): Result => {
  return ethers.utils.defaultAbiCoder.decode(['string', 'uint256'], dataInput);
};

export const validateInputValue = (value: number) =>
  (value > 0 && value <= 10) || 'Should be between 0 and 10';

export const fromHex = (number: string) => {
  const parsed = Number.parseInt(number, 16);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
};

export const generateKey = (pre: string) => {
  const date = new Date().getTime();
  return `${pre}_${date}`;
};
