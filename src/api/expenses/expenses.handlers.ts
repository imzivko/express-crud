import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { Expense, Expenses, ExpenseWithId } from './expenses.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

export async function findAll(
  req: Request,
  res: Response<ExpenseWithId[]>,
  next: NextFunction,
) {
  try {
    const expenses = await Expenses.find().toArray();
    res.json(expenses);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  req: Request<{}, ExpenseWithId, Expense>,
  res: Response<ExpenseWithId>,
  next: NextFunction,
) {
  try {
    const insertResult = await Expenses.insertOne(req.body);

    if (!insertResult.acknowledged) throw new Error('Error inserting expense');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}

export async function findOne(
  req: Request<ParamsWithId, ExpenseWithId, {}>,
  res: Response<ExpenseWithId>,
  next: NextFunction,
) {
  try {
    const result = await Expenses.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404);
      throw new Error(`Expense with id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  req: Request<ParamsWithId, ExpenseWithId, Expense>,
  res: Response<ExpenseWithId>,
  next: NextFunction,
) {
  try {
    const result = await Expenses.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
      {
        returnDocument: 'after',
      },
    );

    if (!result.value) {
      res.status(404);
      throw new Error(`Expense with id "${req.params.id}" not found`);
    }

    res.json(result.value);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction,
) {
  try {
    const result = await Expenses.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });

    if (!result.value) {
      res.status(404);
      throw new Error(`Expense with id "${req.params.id}" not found`);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
