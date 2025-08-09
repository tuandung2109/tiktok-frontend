// File: src/pages/Live/Live.js

import React from 'react';
import styles from './Live.module.scss';

function Live() {   
  return (
    <div className={styles.container}>
      <div className={styles.notificationCard}>
        {/* Sử dụng một thẻ <span> với emoji và áp dụng class CSS */}
        <span className={styles.iconWrapper}>🛠️</span>
        <h1 className={styles.title}>Live page đang được phát triển</h1>

      </div>
    </div>
  );
}

export default Live;