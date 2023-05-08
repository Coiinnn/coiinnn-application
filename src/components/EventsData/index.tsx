'use client';

import React from 'react';

import useLotteryGames from '@/hooks/useLotteryGames';

import styles from './styles.module.scss';

const EventsData = () => {
  const gameEvents = useLotteryGames();

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Games:</p>
      <div className={styles.wrapper_cards}>
        {gameEvents.length === 0 ? (
          <p className={styles.label} style={{ alignSelf: 'center' }}>
            No games yet...
          </p>
        ) : (
          <>
            {gameEvents.map((event) => {
              return (
                <div
                  className={`${styles.card} ${
                    event.result === 'win' ? styles.win : styles.lose
                  }`}
                  key={event.id}
                >
                  <div>Player: {event.owner}</div>
                  <span>
                    {event.result === 'win'
                      ? `+ ${(event.amount * 0.95).toFixed(2)}`
                      : `- ${event.amount.toFixed(2)}`}
                    &nbsp;BIT
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsData;
