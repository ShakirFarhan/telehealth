'use client';
import React, { useState } from 'react'
import styles from "./PasswordInput.module.css";

// React Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({placeholder, label, value, handleChange}: {placeholder: string, label: string, value: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={styles.password__group}>
      <input name='password' value={value} onChange={(e) => {handleChange(e)}} required type={showPassword ? "text" : "password"} placeholder={placeholder} aria-labelledby={label} pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}' title='Password should 6-24 characters long, A uppercase, A lowercase, A digit, A special character.' />
      <button type='button' title={showPassword ? 'Hide' : 'Show'} onClick={() => {setShowPassword(!showPassword)}}>
          {
            showPassword ? 
            <AiOutlineEyeInvisible fontSize={21}/> :
            <AiOutlineEye fontSize={21}/>
          }
      </button>
    </div>
  )
}

export default PasswordInput;



















// <div className={styles.pass__withhelper}>
//   <div className={styles.password__group}>
//       <input required type={showPassword ? "text" : "password"} placeholder={placeholder} aria-labelledby={label} onChange={(e) => {
//         isPasswordValid(e.target.value);
//       }} onBlur={() => {setShowPassError(true)}} onFocus={(e) => {isPasswordValid(e.target.value)}} />
//       <button type='button' title={showPassword ? 'Hide' : 'Show'} onClick={() => {setShowPassword(!showPassword)}}>
//           {
//             showPassword ? 
//             <AiOutlineEyeInvisible fontSize={21}/> :
//             <AiOutlineEye fontSize={21}/>
//           }
//       </button>
//   </div>
//   {
//     showPassError || <p className={styles.show__helpertext}>
//       Password should 6-24 characters long, A uppercase, A lowercase, A digit, A special character.
//     </p>
//   }
// </div>