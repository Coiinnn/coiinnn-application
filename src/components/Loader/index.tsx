import React, { FC } from 'react';

import styles from './styles.module.scss';

type LoaderProperties = {
  size?: number;
};

const Loader: FC<LoaderProperties> = ({ size = 40 }) => {
  return <div className={styles.loader} data-width={size} />;
};

export default Loader;
