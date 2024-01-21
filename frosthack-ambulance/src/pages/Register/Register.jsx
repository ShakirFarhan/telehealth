import React, { useState } from 'react'
import styles from "./Register.module.css";
import AuthBanner from "../../components/AuthBanner/AuthBanner.jsx"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';
const defaultDetails = {
  email: "",
  password: "",
  vehicleNo: "",
  ownerName: "",
  ownerContact: ""
}

const Register = () => {
  const [formDetails, setFormDetails] = useState(defaultDetails)
  const { app__authentication, app__login, login__main, login__pass, login__submit } = styles;
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
    let details = {
      email: formDetails.email,
      password: formDetails.password,
      vehicleNo: formDetails.vehicleNo,
      owner: {
        name: formDetails.ownerName,
        contact: formDetails.ownerContact
      }

    }
    const { data } = await axios.post('https://frosthacks-backend.onrender.com/api/v1/ambulance/register', details)
    if (!data.success) {
      return toast.warning("Something went wrong.")
    }
    toast.success("Ambulance Registered!")
    localStorage.setItem('ambulanceToken', data.accessToken)
    navigate("/")
  }
  return (
    <main className={app__authentication}>
      <AuthBanner />
      <section className={app__login}>
        {
          localStorage.getItem('ambulanceToken') ? (
            <div className={styles.recent__login}>
              <p>You have recently logged in!</p>
              <Link to={"/dashboard"}>Take to Dashboard</Link>
            </div>
          ) : (
            <form className={login__main} onSubmit={handleOnSubmit}>
              <h1>Register</h1>
              <input name='email' type="text" placeholder='Email' aria-label='Email' onChange={handleOnChange} value={formDetails.email} />
              <div className={login__pass}>
                <input type="password" placeholder='Password' aria-label='Password' name='password' onChange={handleOnChange} value={formDetails.password} />
              </div>
              <input name='vehicleNo' type="text" placeholder='Vehicle No' onChange={handleOnChange} value={formDetails.vehicleNo} />
              <input name='ownerName' type="text" placeholder='Owner Name' onChange={handleOnChange} value={formDetails.ownerName} />
              <input name='ownerContact' type="text" placeholder='Owner Contact' onChange={handleOnChange} value={formDetails.ownerContact} />
              <div className={login__submit}>
                <button type='submit'>Register</button>
                <p>Already Registered? <Link to={"/login"}>Login.</Link></p>
              </div>
            </form>
          )
        }
      </section>
    </main>
  )
}

export default Register