import { Router } from 'express';
import { fetchScan, issueDemoToken, startScan } from '../controllers/scanController.js';
import { validateScanRequest } from '../middlewares/validate.js';
import { optionalAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/scan', optionalAuth, validateScanRequest, startScan);
router.get('/scan/:id', optionalAuth, fetchScan);
router.get('/auth/demo-token', issueDemoToken);

export default router;
