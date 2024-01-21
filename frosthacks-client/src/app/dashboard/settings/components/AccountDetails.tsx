'use client';
import React from 'react';
import styles from '../page.module.css';
import EachDetailsInput from './EachDetailInput';

const AccountDetails = ({ name, hospitalid, email, type }: any) => {
  return (
    <form className={styles.account__details}>
      <h3>Account Details</h3>
      <div className={styles.details__main}>
        <EachDetailsInput label={'Hospital Name'} placeholder={name} />
        <EachDetailsInput label="Hospital ID" placeholder={hospitalid} />
        <EachDetailsInput
          inputType="email"
          label="Email Address"
          placeholder={email}
        />
        <EachDetailsInput label="Type" placeholder={type} />
      </div>
      <button type="submit">Update Details</button>
    </form>
  );
};

export default AccountDetails;
