"use client";
import React, { useState } from 'react'
import styles from "../page.module.css";

// Components
import PasswordInput from '@/components/PasswordInput/PasswordInput';

const ChangePassword = () => {

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordDetails({
        ...passwordDetails,
        [e.target.name]: e.target.value
    });
  }

  return (
    <form className={styles.change__password}>
        <h3>Change Your Password</h3>
        <PasswordInput handleChange={updatePassword} value={passwordDetails.currentPassword} placeholder='Current Password' label='Current Password' />
        <PasswordInput handleChange={updatePassword} value={passwordDetails.newPassword} placeholder='New Password' label='New Password' />
        <PasswordInput handleChange={updatePassword} value={passwordDetails.confirmNewPassword} placeholder='Re-enter New Password' label='Re-enter New Password' />
        <button type='submit'>Update Password</button>
    </form>
  )
}

export default ChangePassword;