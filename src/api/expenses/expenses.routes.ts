import { Router } from 'express';

import * as ExpenseHandlers from './expenses.handlers';
import { Expense } from './expenses.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';

const router = Router();

// GET all expenses
router.get('/', ExpenseHandlers.findAll);

// GET expense by id
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ExpenseHandlers.findOne,
);

// POST new expense
router.post(
  '/',
  validateRequest({
    body: Expense,
  }),
  ExpenseHandlers.createOne,
);

// PUT expense by id
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Expense,
  }),
  ExpenseHandlers.updateOne,
);

// DELETE expense by id
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ExpenseHandlers.deleteOne,
);

export default router;
