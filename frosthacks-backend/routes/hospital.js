import express from 'express';
import {
  hospitalDetails,
  loginHospital,
  registerHospital,
} from '../controllers/hospital.js';
import { isHospitalAuthenticated } from '../middlewares/hospital.js';
import {
  acceptCase,
  getAllCases,
  getCaseDetails,
  getHospitalCases,
} from '../controllers/case.js';
const router = express.Router();
router.post('/register', registerHospital);
router.post('/login', loginHospital);
router.get('/me', isHospitalAuthenticated, hospitalDetails);
router.get('/case/all', isHospitalAuthenticated, getAllCases);
router.get('/cases/:caseId', isHospitalAuthenticated, getCaseDetails);
router.patch('/case/:caseId/accept', isHospitalAuthenticated, acceptCase);
router.get('/case/me', isHospitalAuthenticated, getHospitalCases);
export default router;
