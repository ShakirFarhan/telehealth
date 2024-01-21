import React, { useState } from 'react'
import styles from "./login.module.css";
import AuthBanner from "../../components/AuthBanner/AuthBanner.jsx"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';
const Login = () => {
  const [formDetails, setFormDetails] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setFormDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('https://frosthacks-backend.onrender.com/api/v1/ambulance/login', formDetails)
    if (!data.success) {
      return toast.warning("Something went wrong.")
    }
    toast.success("Login Sucessfull!")
    localStorage.setItem('ambulanceToken', data.accessToken)
    navigate('/')
  }
  const { app__authentication, app__login, login__main, login__pass, login__submit } = styles;

  return (
    <main className={app__authentication}>
      <AuthBanner />
      <section className={app__login}>
        {
          localStorage.getItem('ambulanceToken') ? (
            <div className={styles.recent__login}>
              <p>You have recently logged in!</p>
              <Link to={"/"}>Take to Dashboard</Link>
            </div>
          ) : (
            <form className={login__main} onSubmit={handleOnSubmit}>
              <h1>Login</h1>
              <input name='email' type="text" placeholder='Email' onChange={handleOnChange} value={formDetails.email} />
              <div className={login__pass}>
                <input type="password" placeholder='Password' aria-label='Password' name='password' onChange={handleOnChange} value={formDetails.password} />
                <Link to={"/auth/forgotpassword"}>Forgot Password?</Link>
              </div>
              <div className={login__submit}>
                <button type='submit'>Login</button>
                <p>New Here? <Link to={"/register"}>Register.</Link></p>
              </div>
            </form>
          )
        }
      </section>
    </main>
  )
}

export default Login