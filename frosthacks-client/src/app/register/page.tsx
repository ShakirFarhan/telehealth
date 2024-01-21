"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import React, {useContext, useEffect, useState} from "react";

// Components
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import RegisterProgress from "./components/RegisterProcess/RegisterProgress";

// Context API
import { AppContext } from "@/context/AppContext";
import { AppContextTypes } from "@/types/Context";

// Data
import { ambulanceServiceProviders, govtHealthSchemes, medicalSpecialities, paymentMethods, privateHealthSchemes, typeOfAmbulancesServices } from "@/constants/data";

// React Icons
import { MdUpload } from "react-icons/md";
import LocationAuto from "./components/LocationAuto/LocationAuto";

const Register = () => {

  const { app__register, register__center, register__main, register__form, input__detail, multi__input } = styles;
  
  const appContext = useContext(AppContext) as AppContextTypes;
  const { hospitalRegister, setHospitalRegister, updateRegisterInfo, sectionsDone, setSectionsDone, handleRegisterSubmit } = appContext;

  const [additionalContactsText, setAdditionalContactsList] = useState('');
  const [otherMedicalSpecialitiesList, setOtherMedicalSpecialitiesList] = useState('');

  useEffect(() => {

    setHospitalRegister({
      ...hospitalRegister,
      additionalContacts: additionalContactsText ? additionalContactsText.split(',').map((item) => item.trim()) : []
    })

    // eslint-disable-next-line
  }, [additionalContactsText]);

  useEffect(() => {

    setHospitalRegister({
      ...hospitalRegister,
      otherMedicalSpecialities: otherMedicalSpecialitiesList ? otherMedicalSpecialitiesList.split(',').map((item) => item.trim()) : []
    })

    // eslint-disable-next-line
  }, [otherMedicalSpecialitiesList]);

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setHospitalRegister({
        ...hospitalRegister,
        [e.target.name]: [...hospitalRegister[e.target.name] as [], e.target.value]
      })
    }
    else {
      setHospitalRegister({
        ...hospitalRegister,
        [e.target.name]: (hospitalRegister[e.target.name] as []).filter((item: string) => item !== e.target.value)
      })
    }
  }

  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setSelectedDocs(Array.from(e.target.files));
  }

  return (
    <main className={app__register}>
      <div className={register__center}>
        
        <h1>New Hospital Registration</h1>
        <RegisterProgress/>

        <section className={register__main}>

          {/* Form 1 - Hospital Information */}

          {
            sectionsDone === 0 && (
              <form className={register__form} onSubmit={(e) => {
                e.preventDefault();
                setSectionsDone(1);
              }}>
                <h2>Hospital Information</h2>
                <input value={hospitalRegister.hospitalName} onChange={(e) => {updateRegisterInfo(e)}} name="hospitalName" type="text" placeholder='Legal Hospital Name*' required aria-label='Legal Hospital Name'/>
                <input value={hospitalRegister.email} onChange={(e) => {updateRegisterInfo(e)}} name="email" type="email" placeholder='Email*' required aria-label='Email'/>
                <PasswordInput value={hospitalRegister.password} handleChange={updateRegisterInfo} label="Password" placeholder="Password" />
                <input value={hospitalRegister.hospitalRegId} onChange={(e) => {updateRegisterInfo(e)}} name="hospitalRegId" type="text" placeholder="Hospital Registration No*" pattern="[A-Z]{2}[0-9]{2}[0-9]{4}" title="Must be in AA112222 Pattern" required aria-label="Hospital Reg Number" />
                <div className={input__detail}>
                  <input value={hospitalRegister.typeOfHospital} onChange={(e) => {updateRegisterInfo(e)}} name="typeOfHospital" type="text" placeholder="Type Of Hospital*" required aria-label="Type Of Hospital" />
                  <p>Ex: Super Speciality, Multi Speciality, General etc</p>
                </div>
                <button type="submit">Next</button>
              </form>
            )
          }

          {/* Form 1 - Hospital Information */}

          {/* Form 2 - Contact Information */}

          {
            sectionsDone === 1 && (
              <form className={register__form} onSubmit={(e) => {
                e.preventDefault();
                setSectionsDone(2);
              }}>
                <h2>Contact Information</h2>
                <input required type="text" value={hospitalRegister.primaryContact} onChange={(e) => {updateRegisterInfo(e)}} placeholder="Hospital Contact Number*" aria-label="Primary Hospital Contact Number" name="primaryContact" pattern="^[0-9+\s]*$" title="Provide valid Contact Number - Only Digits (0-9)" />

                <h3>Hospital Location</h3>
                <LocationAuto/>
                <div className={multi__input}>
                  <input type="text" value={hospitalRegister.hospitalLat} readOnly  name="Latitude" aria-label="Latitude" placeholder="Latitude(auto-filled)" />
                  <input type="text" value={hospitalRegister.hospitalLong} readOnly name="Longitude" aria-label="Longitude" placeholder="Longitude(auto-filled)" />
                </div>

                <h3>Regular Operating Hours (From, To) - 24Hrs Format</h3>
                <div className={multi__input}>
                  <input type="time" value={hospitalRegister.regularTimeFrom} onChange={(e) => {updateRegisterInfo(e)}} name="regularTimeFrom" required aria-label="Regular Operating Time From" />
                  <input type="time" value={hospitalRegister.regularTimeTo} onChange={(e) => {updateRegisterInfo(e)}} name="regularTimeTo" required aria-label="Regular Operating Time To" />
                </div>
                
                <h3>Total Beds in Hospital</h3>
                <input type="number" name="totalBeds" value={hospitalRegister.totalBeds} onChange={(e) => {updateRegisterInfo(e)}} placeholder="Total Beds in Hospital*" required aria-label="Total Beds in Hospital" min="0" step="1" />
                <button type="submit">Next</button>
              </form>
            )
          }

          {/* Form 2 - Contact Information */}

          {/* Form 3 - Specializations & Services */}

          {
            sectionsDone === 2 && (
              <form className={register__form} onSubmit={(e) => {
                e.preventDefault();
                setSectionsDone(3);
              }}>
                <h2>Specializations & Services</h2>
                <h3>Medical Specilalities Offered</h3>
                {
                  medicalSpecialities.map((item) => {
                    return (
                      <div key={item.id} className={styles.form__check}>
                        <input type="checkbox" checked={hospitalRegister.medicalSpecialities.includes(item.value) ? true : false} onChange={(e) => {handleCheckboxes(e)}} value={item.value} id={`speciality-${item.id}`} name="medicalSpecialities" />
                        <label htmlFor={`speciality-${item.id}`}>{item.label}</label>
                      </div>
                    )
                  })
                }
                <div className={input__detail}>
                  <input type="text" name="otherMedicalSpecialities" value={otherMedicalSpecialitiesList} onChange={(e) => {
                    setOtherMedicalSpecialitiesList(e.target.value);
                  }} placeholder="Other Medical Specialities" title="Should be comma seperated values." />
                  <p>Comma seperated</p>
                </div>
                <button type="submit">Next</button>
              </form>
            )
          }

          {/* Form 3 - Specializations & Services */}

          {/* Form 4 - Insurance and Payments */}

          {
            sectionsDone === 3 && (
              <form className={register__form} onSubmit={(e) => {
                e.preventDefault();
                setSectionsDone(4);
              }}>

                <h2>Insurance & Payment Information</h2>
                <h3>Accepted Payment Methods</h3>
                {
                  paymentMethods.map((item) => {
                    return (
                      <div key={item.id} className={styles.form__check}>
                        <input type="checkbox" checked={hospitalRegister.paymentMethods.includes(item.value) ? true : false} onChange={(e) => {handleCheckboxes(e)}} value={item.value} id={`payment-${item.id}`} name="paymentMethods" />
                        <label htmlFor={`payment-${item.id}`}>{item.label}</label>
                      </div>
                    )
                  })
                }
                <h3>Govt Health Insurance Schemes</h3>
                {
                  govtHealthSchemes.map((item) => {
                    return (
                      <div key={item.id} className={styles.form__check}>
                        <input type="checkbox" checked={hospitalRegister.govtHealthSchemes.includes(item.value) ? true : false} onChange={(e) => {handleCheckboxes(e)}} value={item.value} id={`govtInsuranceScheme-${item.id}`} name="govtHealthSchemes" />
                        <label htmlFor={`govtInsuranceScheme-${item.id}`}>{item.label}</label>
                      </div>
                    )
                  })
                }
                <h3>Private Health Insurance Schemes</h3>
                {
                  privateHealthSchemes.map((item) => {
                    return (
                      <div key={item.id} className={styles.form__check}>
                        <input type="checkbox" checked={hospitalRegister.privateHealthSchemes.includes(item.value) ? true : false} onChange={(e) => {handleCheckboxes(e)}} value={item.value} id={`privateInsuranceScheme-${item.id}`} name="privateHealthSchemes" />
                        <label htmlFor={`privateInsuranceScheme-${item.id}`}>{item.label}</label>
                      </div>
                    )
                  })
                }
                <button type="submit">Next</button>

              </form>
            )
          }

          {/* Form 4 - Insurance and Payments */}

          {/* Form 5 - Emergency & Ambulance Services */}

          {
            sectionsDone === 4 && (
              <form className={register__form} onSubmit={(e) => {
                e.preventDefault();
                setSectionsDone(5);
              }}>

                <h2>Emergency and Ambulance Services</h2>
                <h3>Emergency Services</h3>
                <div className={styles.form__check}>
                  <input type="radio" required value='Available' onChange={(e) => {updateRegisterInfo(e)}} id="e-available" name="emergencyServicesAvailability" />
                  <label htmlFor="e-available">Available</label>
                </div>
                <div className={styles.form__check}>
                  <input type="radio" required value='Not Available' onChange={(e) => {updateRegisterInfo(e)}} id="e-notAvailable" name="emergencyServicesAvailability" />
                  <label htmlFor="e-notAvailable">Not Available</label>
                </div>
                {
                  hospitalRegister.emergencyServicesAvailability === 'Available' && (
                    <>
                      <h3>Emergency Dept. Operating Hours (From, To) - 24Hrs Format</h3>
                      <div className={multi__input}>
                        <input type="time" value={hospitalRegister.emergencyTimeFrom} onChange={(e) => {updateRegisterInfo(e)}}  name="emergencyTimeFrom" required aria-label="Emergency Operating Time From" />
                        <input type="time" value={hospitalRegister.emergencyTimeTo} onChange={(e) => {updateRegisterInfo(e)}} name="emergencyTimeTo" required aria-label="Emergency Operating Time To" />
                      </div>
                    </>
                  )
                }
                <h3>Ambulance Services</h3>
                <div className={styles.form__check}>
                  <input type="radio" required value='Available' onChange={(e) => {updateRegisterInfo(e)}} id="a-available" name="ambulanceServicesAvailability" />
                  <label htmlFor="a-available">Available</label>
                </div>
                <div className={styles.form__check}>
                  <input type="radio" required value='Not Available' onChange={(e) => {updateRegisterInfo(e)}} id="a-notAvailable" name="ambulanceServicesAvailability" />
                  <label htmlFor="a-notAvailable">Not Available</label>
                </div>
                {
                  hospitalRegister.ambulanceServicesAvailability === 'Available' && (
                    <>
                      <h3>Service Providers</h3>
                      {
                        ambulanceServiceProviders.map((item) => {
                          return (
                            <div key={item.id} className={styles.form__check}>
                              <input type="checkbox" checked={hospitalRegister.ambulanceServiceProviders.includes(item.value) ? true : false} onChange={(e) => {handleCheckboxes(e)}} value={item.value} id={`ambulanceService-${item.id}`} name="ambulanceServiceProviders" />
                              <label htmlFor={`ambulanceService-${item.id}`}>{item.label}</label>
                            </div>
                          )
                        })
                      }
                      <h3>Total Ambulances Available</h3>
                      <input type="number" name="totalAmbulancesAvailable" value={hospitalRegister.totalAmbulancesAvailable} onChange={(e) => {updateRegisterInfo(e)}} placeholder="Total Ambulances Available" required aria-label="Total Ambulances Available" min="0" step="1" />
                      <h3>Service Providers</h3>
                      {
                        typeOfAmbulancesServices.map((item) => {
                          return (
                            <div key={item.id} className={styles.form__check}>
                              <input type="checkbox" checked={hospitalRegister.typeOfAmbulancesServices.includes(item.value) ? true : false} onChange={(e) => {handleCheckboxes(e)}} value={item.value} id={`typeAmbulanceService-${item.id}`} name="typeOfAmbulancesServices" />
                              <label htmlFor={`typeAmbulanceService-${item.id}`}>{item.label}</label>
                            </div>
                          )
                        })
                      }
                    </>
                  )
                }
                <button type="submit">Next</button>

              </form>
            )
          }

          {/* Form 5 - Emergency & Ambulance Services */}

          {/* Form 6 - Terms and Conditions */}

          {
            sectionsDone === 5 && (
              <form className={register__form} onSubmit={(e) => {handleRegisterSubmit(e)}}>

                <h2>Terms and Conditions</h2>
                <p id={styles.tnc}>Read our <Link href="#">Terms and Conditions</Link></p>
                <div className={styles.form__check}>
                  <input type="radio" value='Agreed' required onChange={(e) => {updateRegisterInfo(e)}} id="terms-agree" name="termsAcceptance" />
                  <label htmlFor="terms-agree">I Agree</label>
                </div>
                <div className={styles.form__check}>
                  <input type="radio" value="Not Agreed" required onChange={(e) => {updateRegisterInfo(e)}} id="terms-notagree" name="termsAcceptance"  />
                  <label htmlFor="terms-notagree">I don&#39;t Agree </label>
                </div>

                <button type="submit" disabled={hospitalRegister.termsAcceptance === 'Agreed' ? false : true}>Register</button>

              </form>
            )
          }

          {/* Form 6 - Terms and Conditions */}

          {/* Final Showcase */}

          {
            sectionsDone === 6 && (
              <div className={styles.final__showcase}>
                <p>All Done!</p>
                <Image src="/assets/MedicalCare.svg" alt="All Done" width={260} height={210} />
                <Link href={"/"}>Login Now</Link>
              </div>
            )
          }

          {/* Final Showcase */}

        </section>

      </div>
    </main>
  );
};

export default Register;