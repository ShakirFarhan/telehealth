import React from 'react'
import styles from "./Dashboard.module.css"
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <button className={styles.add__button}><Link to="/add-case">Add Case</Link></button>
    </div>
  )
}

export default Dashboard