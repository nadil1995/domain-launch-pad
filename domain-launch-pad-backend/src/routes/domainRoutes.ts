import express, { Request, Response, NextFunction } from 'express';
import { getDomains, createDomain } from '../controllers/domainController';

const router = express.Router();

// Explicitly define the handler types
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getDomains(req, res).catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  createDomain(req, res).catch(next);
});

export default router;
