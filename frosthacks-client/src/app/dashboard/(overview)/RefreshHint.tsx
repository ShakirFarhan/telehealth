"use client";
import React from 'react'
import styles from "../page.module.css";

// React Icons
import { FiRefreshCw } from "react-icons/fi";

const RefreshHint = () => {
  return (
    <button type="button" title='Refresh' onClick={() => {console.log('Refresh')}}><FiRefreshCw fontSize={21} /></button>
  )
}

export default RefreshHint