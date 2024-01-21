import { CheckboxType } from "@/types";

const medicalSpecialities: CheckboxType[] = [
    {
        id: 1,
        value: "Emergency Care",
        label: "Emergency Care"
    },
    {
        id: 2,
        value: "Surgical Treatments",
        label: "Surgical Treatments"
    },
    {
        id: 3,
        value: "Medical Treatments",
        label: "Medical Treatments"
    },
    {
        id: 4,
        value: "Maternity and Obstetric Care",
        label: "Maternity and Obstetric Care"
    },
    {
        id: 5,
        value: "Pediatric Care",
        label: "Pediatric Care"
    },
    {
        id: 6,
        value: "Cancer Treatments",
        label: "Cancer Treatments"
    },
    {
        id: 7,
        value: "Cardiovascular Treatments",
        label: "Cardiovascular Treatments"
    },
    {
        id: 8,
        value: "Orthopedic Treatments",
        label: "Orthopedic Treatments"
    },
    {
        id: 9,
        value: "Neurological Treatments",
        label: "Neurological Treatments"
    },
    {
        id: 10,
        value: "Gynecological Treatments",
        label: "Gynecological Treatments"
    },
    {
        id: 11,
        value: "Urological Treatments",
        label: "Urological Treatments"
    },
    {
        id: 12,
        value: "Gastrointestinal Treatments",
        label: "Gastrointestinal Treatments"
    },
    {
        id: 13,
        value: "Respiratory Treatments",
        label: "Respiratory Treatments"
    },
    {
        id: 14,
        value: "Psychiatric and Behavioral Health Services",
        label: "Psychiatric and Behavioral Health Services"
    },
    {
        id: 15,
        value: "Rehabilitation Services",
        label: "Rehabilitation Services"
    },
    {
        id: 16,
        value: "Infectious Disease Treatments",
        label: "Infectious Disease Treatments"
    },
    {
        id: 17,
        value: "Nephrology Treatments",
        label: "Nephrology Treatments"
    },
    {
        id: 18,
        value: "Endocrinology Treatments",
        label: "Endocrinology Treatments"
    },
    {
        id: 19,
        value: "Rheumatology Treatments",
        label: "Rheumatology Treatments"
    },
    {
        id: 20,
        value: "Plastic and Cosmetic Surgery",
        label: "Plastic and Cosmetic Surgery"
    },
    {
        id: 21,
        value: "Palliative and Hospice Care",
        label: "Palliative and Hospice Care"
    },
    {
        id: 22,
        value: "Geriatric Care",
        label: "Geriatric Care"
    },
    {
        id: 23,
        value: "Oncology",
        label: "Oncology"
    },
    {
        id: 24,
        value: "Pediatrics",
        label: "Pediatrics"
    },
    {
        id: 25,
        value: "Dermatology",
        label: "Dermatology"
    }
]

const paymentMethods: CheckboxType[] = [
    {
        id: 1,
        value: 'Cash',
        label: 'Cash'
    },
    {
        id: 2,
        value: 'Credit/Debit Card',
        label: 'Credit/Debit Card'
    },
    {
        id: 3,
        value: 'Employee Health Schemes (EHS)',
        label: 'Employee Health Schemes (EHS)'
    },
    {
        id: 4,
        value: 'Government Insurance',
        label: 'Government Insurance'
    },
    {
        id: 5,
        value: 'Private Insurance',
        label: 'Private Insurance'
    }
]

const govtHealthSchemes: CheckboxType[] = [
    {
        id: 1,
        value: 'Central Government Health Scheme (CGHS)',
        label: 'Central Government Health Scheme (CGHS)'
    },
    {
        id: 2,
        value: "Employees' State Insurance Scheme (ESIS)",
        label: "Employees' State Insurance Scheme (ESIS)"
    },
    {
        id: 3,
        value: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
        label: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)"
    },
    {
        id: 4,
        value: 'Corporate Health Insurance',
        label: 'Corporate Health Insurance'
    },
    
]

const privateHealthSchemes: CheckboxType[] = [
    {
        id: 1,
        value: 'HDFC Ergo Health Insurance (formerly Apollo Munich Health Insurance)',
        label: 'HDFC Ergo Health Insurance (formerly Apollo Munich Health Insurance)'
    },
    {
        id: 2,
        value: 'Bajaj Allianz Health Insurance',
        label: 'Bajaj Allianz Health Insurance'
    },
    {
        id: 3,
        value: 'ICICI Lombard General Insurance',
        label: 'ICICI Lombard General Insurance'
    },
    {
        id: 4,
        value: 'Religare Health Insurance (now Care Health Insurance)',
        label: 'Religare Health Insurance (now Care Health Insurance)'
    },
    {
        id: 5,
        value: 'Star Health and Allied Insurance',
        label: 'Star Health and Allied Insurance'
    },
    {
        id: 6,
        value: 'Max Bupa Health Insurance',
        label: 'Max Bupa Health Insurance'
    },
    {
        id: 7,
        value: 'ManipalCigna Health Insurance',
        label: 'ManipalCigna Health Insurance'
    },
    {
        id: 8,
        value: 'Aditya Birla Health Insurance',
        label: 'Aditya Birla Health Insurance'
    },
    {
        id: 9,
        value: 'New India Assurance',
        label: 'New India Assurance'
    },
    {
        id: 10,
        value: 'National Insurance Company',
        label: 'National Insurance Company'
    },
    {
        id: 11,
        value: 'United India Insurance Company',
        label: 'United India Insurance Company'
    },
    {
        id: 12,
        value: 'Oriental Insurance Company',
        label: 'Oriental Insurance Company'
    },
    {
        id: 13,
        value: 'IFFCO Tokio General Insurance',
        label: 'IFFCO Tokio General Insurance'
    },
    {
        id: 14,
        value: 'Future Generali India Insurance',
        label: 'Future Generali India Insurance'
    },
    {
        id: 15,
        value: 'Kotak Mahindra General Insurance',
        label: 'Kotak Mahindra General Insurance'
    },
    {
        id: 16,
        value: 'SBI Health Insurance',
        label: 'SBI Health Insurance'
    },
    {
        id: 17,
        value: 'Royal Sundaram General Insurance',
        label: 'Royal Sundaram General Insurance'
    },
    {
        id: 18,
        value: 'DHFL General Insurance (now part of IFFCO Tokio)',
        label: 'DHFL General Insurance (now part of IFFCO Tokio)'
    },
    {
        id: 19,
        value: 'Tata AIG General Insurance',
        label: 'Tata AIG General Insurance'
    },
    {
        id: 20,
        value: 'Liberty General Insurance',
        label: 'Liberty General Insurance'
    },
    {
        id: 21,
        value: 'Niva Bupa Health Insurance',
        label: 'Niva Bupa Health Insurance'
    },
    {
        id: 22,
        value: 'Care Health Insurance',
        label: 'Care Health Insurance'
    },
    {
        id: 23,
        value: 'Reliance Health Insurance',
        label: 'Reliance Health Insurance'
    },
    {
        id: 24,
        value: 'ManipalCigna Health Insurance',
        label: 'ManipalCigna Health Insurance'
    },
    {
        id: 25,
        value: 'Cholamandalam Health Insurance',
        label: 'Cholamandalam Health Insurance'
    },
    {
        id: 26,
        value: 'SBI Health Insurance',
        label: 'SBI Health Insurance'
    },
    {
        id: 27,
        value: 'Royal Sundaram Health Insurance',
        label: 'Royal Sundaram Health Insurance'
    },
    {
        id: 28,
        value: 'Zuno Health Insurance',
        label: 'Zuno Health Insurance'
    },
    {
        id: 29,
        value: 'Magma HDI Health Insurance',
        label: 'Magma HDI Health Insurance'
    },
    {
        id: 30,
        value: 'Universal Sompo Health Insurance',
        label: 'Universal Sompo Health Insurance'
    },
    {
        id: 31,
        value: 'Digit Health Insurance',
        label: 'Digit Health Insurance'
    },
    {
        id: 32,
        value: 'Apollo Munich Health Insurance',
        label: 'Apollo Munich Health Insurance'
    },
    
]

const ambulanceServiceProviders: CheckboxType[] = [
    {
        id: 1,
        value: 'Owned',
        label: 'Owned'
    },
    {
        id: 2,
        value: 'Private Leased',
        label: 'Private Leased'
    },
]

const typeOfAmbulancesServices: CheckboxType[] = [
    {
        id: 1,
        value: 'ALS',
        label: 'ALS'
    },
    {
        id: 2,
        value: 'BLS',
        label: 'BLS'
    },
    {
        id: 3,
        value: 'PTA',
        label: 'PTA'
    },
    {
        id: 4,
        value: 'Mortuary',
        label: 'Mortuary'
    },
]

export { medicalSpecialities, paymentMethods, govtHealthSchemes, privateHealthSchemes, ambulanceServiceProviders, typeOfAmbulancesServices };