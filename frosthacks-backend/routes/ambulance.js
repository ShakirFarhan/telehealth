import express from 'express';
import {
  ambulanceDetails,
  getAmbulanceCases,
  loginAmbulance,
  registerAmbulance,
} from '../controllers/ambulance.js';
import { isAmbulanceAuthenticated } from '../middlewares/ambulance.js';
import { addCase, closeCase, updateCase } from '../controllers/case.js';
const router = express.Router();
router.post('/login', loginAmbulance);
router.post('/register', registerAmbulance);
router.get('/me', isAmbulanceAuthenticated, ambulanceDetails);
router.post('/case/add', isAmbulanceAuthenticated, addCase);
router.patch('/case/:caseId', isAmbulanceAuthenticated, updateCase);
router.get('/case/me', isAmbulanceAuthenticated, getAmbulanceCases);
router.patch('/case/:casedId/close', isAmbulanceAuthenticated, closeCase);

export default router;
