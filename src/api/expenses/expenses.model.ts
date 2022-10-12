import * as z from 'zod';
import { WithId } from 'mongodb';

import { db } from '../../db';

export const Expense = z.object({
  wpm: z.string().min(1),
});

export type Expense = z.infer<typeof Expense>;
export type ExpenseWithId = WithId<Expense>;
export const Expenses = db.collection<Expense>('expenses');
