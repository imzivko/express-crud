import express from 'express';

import expenses from './expenses/expenses.routes';
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - Success!',
  });
});

router.use('/expenses', expenses);

export default router;
