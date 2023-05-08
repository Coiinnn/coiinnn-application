import React from 'react';

import styles from '@/app/page.module.css';
import EventsData from '@/components/EventsData';
import PlayGame from '@/components/PlayGame';

const Page = () => {
  return (
    <div className={styles.columns}>
      <PlayGame />
      <EventsData />
    </div>
  );
};

export default Page;
