// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-date-now */
import { Result } from '@ethersproject/abi';
import { ethers } from 'ethers';

export const decodeData = (dataInput: string): Result => {
  return ethers.utils.defaultAbiCoder.decode(['string', 'uint256'], dataInput);
};

export const validateInputValue = (value: number) =>
  (value > 0 && value <= 10) || 'Should be between 0 and 10';

export const validateInputValueMoreThanZero = (value: number) =>
  value > 0 || 'Should be more than 0';

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

export const startAndEnd = (string_: string | undefined, gap: number) => {
  const lngth = 30;
  const gapMin = 0;
  if (string_ && string_.length > lngth) {
    return `${string_.slice(gapMin, Math.max(0, gap))}...${string_.slice(
      string_.length - gap,
      string_.length - gap + string_.length,
    )}`;
  }
  return string_;
};
