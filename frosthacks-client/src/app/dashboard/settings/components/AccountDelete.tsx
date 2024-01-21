'use client';
import React from 'react';
import styles from '../page.module.css';

const AccountDelete = () => {
  return (
    <div className={styles.account__options}>
      <h3>Remove & Logout Account</h3>
      <button type="button">Logout Account</button>
      <button type="button">Remove Account</button>
    </div>
  );
};

export default AccountDelete;
