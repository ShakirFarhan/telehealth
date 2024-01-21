import React, { useState } from 'react'
import axios from 'axios'
import styles from "./AddCase.module.css"
import { toast } from 'react-toastify'

const defaultData = {
  name: "",
  caseType: "",
  gender: "other",
  age: null,
  bp: "",
  heartRate: null,
  spo2: null,
  temperature: null,
  eyeResponse: null,
  motorResponse: null,
  verbalResponse: null,
}
const AddCase = () => {
  const [formDetails, setFormDetails] = useState(defaultData)
  const handleOnChange = (e) => {
    setFormDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  console.log(formDetails.gender)
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(
      'https://frosthacks-backend.onrender.com/api/v1/ambulance/case/add',
      formDetails,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ambulanceToken')}`, // Replace with your actual cookie name
        },
      }
    );
    if (!data.success) {
      return toast.warning("Something went wrong.")
    }
    toast.success("Case Added.")
    setFormDetails(defaultData)
  }
  return (
    <div className={styles.add_case}>
      <form onSubmit={handleOnSubmit}>
        <input type='text' name='name' placeholder='Name' onChange={handleOnChange} value={formDetails.name} />
        <div className={styles.user__details}>
          <input type='number' name='age' placeholder='Age' onChange={handleOnChange} value={formDetails.age} />
          <select name='gender' onChange={handleOnChange} value={formDetails.gender}>
            <option value="male" >Male</option>
            <option value="female" >Female</option>
            <option value="other" >Other</option>
          </select>
          <input type='text' name='caseType' placeholder='Case Type' onChange={handleOnChange} value={formDetails.caseType} />
        </div>
        <div className={styles.vital__info}>
          <input type='text' name='bp' placeholder='BP' onChange={handleOnChange} value={formDetails.bp} />
          <input type='number' name='heartRate' placeholder='Heart Rate' onChange={handleOnChange} value={formDetails.heartRate} />
          <input type='number' name='spo2' placeholder='SPO2' onChange={handleOnChange} value={formDetails.spo2} />
          <input type='number' name='temperature' placeholder='Temperature' onChange={handleOnChange} value={formDetails.temperature} />
        </div>
        <div className={styles.responses__info}>
          <input type='number' name='eyeResponse' placeholder='Eye Response' onChange={handleOnChange} value={formDetails.eyeResponse} />
          <input type='number' name='verbalResponse' placeholder='Verbal Response' onChange={handleOnChange} value={formDetails.verbalResponse} />
          <input type='number' name='motorResponse' placeholder='Motor Response' onChange={handleOnChange} value={formDetails.motorResponse} />
        </div>
        <button type='submit'>Add Case</button>
      </form>
    </div>
  )
}

export default AddCase