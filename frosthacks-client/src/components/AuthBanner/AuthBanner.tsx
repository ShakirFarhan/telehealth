import React from 'react'
import styles from "./AuthBanner.module.css";
import Image from 'next/image';

const AuthBanner = () => {
  return (
    <section className={styles.auth__banner}>
        <h1>Hospital</h1>
        <Image src="/assets/Medical.svg" alt='Medical' width={720} height={450} />
    </section>
  )
}

export default AuthBanner;