export type HospitalRegisterType = {
    [key: string]: string | string[] | number,
    email: string,
    password: string,
    hospitalName: string,
    hospitalRegId: string,
    typeOfHospital: string,

    primaryContact: string,
    regularTimeFrom: string,
    regularTimeTo: string,
    totalBeds: number,
    hospitalLocation: string,
    hospitalLat: string,
    hospitalLong: string,

    medicalSpecialities: string[],
    otherMedicalSpecialities: string[],

    paymentMethods: string[],
    govtHealthSchemes: string[],
    privateHealthSchemes: string[],

    emergencyServicesAvailability: 'Available' | 'Not Available' | '',
    emergencyTimeFrom: string,
    emergencyTimeTo: string,
    ambulanceServicesAvailability: 'Available' | 'Not Available' | '',
    ambulanceServiceProviders: string[],
    typeOfAmbulancesServices: string[]

}

export type AppContextTypes = {
    sectionsDone: number,
    setSectionsDone: (a: number) => void
    hospitalRegister: HospitalRegisterType,
    setHospitalRegister: (data: HospitalRegisterType) => void,
    updateRegisterInfo: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleRegisterSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}