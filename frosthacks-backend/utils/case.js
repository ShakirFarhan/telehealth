import PatientCase from '../models/patientCase.js';

const getCases = async (ambulance, active) => {
  console.log(ambulance, active);
  let query = {};
  if (active) {
    query.hospital = { $exists: false };
  }
  if (ambulance) {
    query.ambulance = ambulance;
  }
  console.log(query);
  const cases = await PatientCase.find(query);
  return cases;
};

export default { getCases };
