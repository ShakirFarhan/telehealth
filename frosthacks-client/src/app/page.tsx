import React from 'react'
import Link from 'next/link';
import styles from "./page.module.css";

// Components
import AuthBanner from '@/components/AuthBanner/AuthBanner';

// Actions
import { userLogin } from './actions';
import { cookies } from 'next/headers';

const Login = () => {
  
  const {app__authentication, app__login, login__main, login__pass, login__submit } = styles;

  return (
    <main className={app__authentication}>
      <AuthBanner/>
      <section className={app__login}>
        {
          cookies().has('hospAdminToken') ? (
            <div className={styles.recent__login}>
              <p>You have recently logged in!</p>
              <Link href={"/dashboard"}>Take to Dashboard</Link>
            </div>
          ) : (
            <form className={login__main} action={userLogin}>
              <h1>Login</h1>
              <input name='email' type="text" placeholder='Email' aria-label='Email'/>
              <div className={login__pass}>
                <input type="password" placeholder='Password' aria-label='Password' name='password' />
                <Link href={"/auth/forgotpassword"}>Forgot Password?</Link>
              </div>
              <div className={login__submit}>
                <button type='submit'>Login</button>
                <p>New Here? <Link href={"/register"}>Register.</Link></p>
              </div>
            </form>
          )
        }
      </section>
    </main>
  )
}

export default Login