'use client';
import { createContext, useEffect, useState } from "react";
import { AppContextTypes, HospitalRegisterType } from "@/types/Context";

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

const AppState = ({ children }: { children: React.ReactNode }) => {

    const [hospitalRegister, setHospitalRegister] = useState<HospitalRegisterType>({
        email: '',
        password: '',
        hospitalName: '',
        hospitalRegId: '',
        typeOfHospital: '',

        primaryContact: '',
        totalBeds: 0,
        regularTimeFrom: '',
        regularTimeTo: '',
        hospitalLocation: '',
        hospitalLat: '',
        hospitalLong: '',

        medicalSpecialities: [],
        otherMedicalSpecialities: [],

        paymentMethods: [],
        govtHealthSchemes: [],
        privateHealthSchemes: [],

        emergencyServicesAvailability: '',
        emergencyTimeFrom: '00:00',
        emergencyTimeTo: '00:00',
        ambulanceServicesAvailability: '',
        ambulanceServiceProviders: [],
        typeOfAmbulancesServices: [],
    })

    const [noOfSectionDone, setNoOfSectionsDone] = useState(0);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [noOfSectionDone]);

    const updateRegisterInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHospitalRegister({
            ...hospitalRegister,
            [e.target.name]: e.target.value
        });
    }

    // Final Register Submit Form Handling

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const hospitalDetails = {
            email: hospitalRegister.email, password: hospitalRegister.password, name: hospitalRegister.hospitalName,
            registrationId: hospitalRegister.hospitalRegId, type: hospitalRegister.typeOfHospital, primaryContact: hospitalRegister.primaryContact,
            regularTimeFrom: hospitalRegister.regularTimeFrom, regularTimeTo: hospitalRegister.regularTimeTo, location: {
                address: hospitalRegister.hospitalLocation,
                latitude: hospitalRegister.hospitalLat,
                longitude: hospitalRegister.hospitalLong
            }, medicalSpecialities: hospitalRegister.medicalSpecialities, otherMedicalSpecialities: hospitalRegister.otherMedicalSpecialities,
            paymentMethods: hospitalRegister.paymentMethods, govtHealthSchemes: hospitalRegister.govtHealthSchemes, privateHealthSchemes: hospitalRegister.privateHealthSchemes, emergencyServicesAvailability: hospitalRegister.emergencyServicesAvailability === 'Available' ? true : false, emergencyTimeFrom: hospitalRegister.emergencyTimeFrom, 
            emergencyTimeTo: hospitalRegister.emergencyTimeTo, ambulanceServicesAvailability: hospitalRegister.ambulanceServicesAvailability === 'Available' ? true : false, ambulanceServiceProviders: hospitalRegister.ambulanceServiceProviders, typeOfAmbulancesServices: hospitalRegister.typeOfAmbulancesServices
        }

        const registrationResponse = await fetch(`https://frosthacks-backend.onrender.com/api/v1/hospital/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hospitalDetails)
        });

        if (!registrationResponse.ok) {
            throw new Error('Error happened during Hospital registration');
        }
        
        setNoOfSectionsDone(6);

    }

    return (
        <AppContext.Provider value={{ hospitalRegister: hospitalRegister, setHospitalRegister: setHospitalRegister, updateRegisterInfo: updateRegisterInfo, sectionsDone: noOfSectionDone, setSectionsDone: setNoOfSectionsDone, handleRegisterSubmit: handleRegisterSubmit }}>
        {children}
        </AppContext.Provider>
    );
};

export default AppState;
