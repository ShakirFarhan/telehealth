import React from 'react';
import styles from './AuthBanner.module.css';
import image from '../../assets/ambulance.png';
const AuthBanner = () => {
  return (
    <section className={styles.auth__banner}>
      <h1>Amubulance</h1>
      <img src={image} alt="Medical" width={720} height={450} />
    </section>
  );
};

export default AuthBanner;
