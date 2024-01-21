import React from 'react'
import Link from 'next/link';
import styles from "./page.module.css";

const notFound = () => {
    
    return (
        <main className={styles.not__found}>
            <div className={styles.notFound__center}>
                <h1>Page Not Found | 404</h1>
                <p>May you&#39;re in a Broken Page. Navigate back to <span>Dahsboard.</span></p>
                <Link href={"/dashboard"}>Dashboard</Link>
            </div>
        </main>
    )
}

export default notFound;