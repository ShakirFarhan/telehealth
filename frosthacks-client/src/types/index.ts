import { IconType } from "react-icons";

export interface LiveCaseTypes {
  isActive: boolean;
  _id: string;
  name: string;
  caseType: string;
  gender: string;
  age: number;
  bp: string;
  heartRate: number;
  spo2: number;
  temperature: number;
  eyeResponse: number;
  verbalResponse: number;
  motorResponse: number;
}

export interface StaffDetailType {
  orgName: string;
  username: string;
  staffRole: string;
  staffName: string;
  mobileNumber: string;
  emailAddress: string;
}

export interface BarChartsDataProps {
  Icon: IconType;
  aboutCases: string;
  caseCount: number;

  labelA: string;
  colorA: string;
  labelB: string;
  colorB: string;
}

export interface AreaChartsDataProps {
  Icon: IconType;
  labelA: string;
  colorA: string;
  labelB: string;
  colorB: string;
}

export interface CheckboxType {
  id: number;
  value: string;
  label: string;
}
