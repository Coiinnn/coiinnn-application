import React from 'react';

import styles from './styles.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      {`Copyright`} &#xa9; {`${new Date().getFullYear()} Coiinnn`}
    </div>
  );
};

export default Footer;
