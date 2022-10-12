"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.findOne = exports.createOne = exports.findAll = void 0;
const mongodb_1 = require("mongodb");
const expenses_model_1 = require("./expenses.model");
async function findAll(req, res, next) {
    try {
        const expenses = await expenses_model_1.Expenses.find().toArray();
        res.json(expenses);
    }
    catch (error) {
        next(error);
    }
}
exports.findAll = findAll;
async function createOne(req, res, next) {
    try {
        const insertResult = await expenses_model_1.Expenses.insertOne(req.body);
        if (!insertResult.acknowledged)
            throw new Error('Error inserting expense');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        });
    }
    catch (error) {
        next(error);
    }
}
exports.createOne = createOne;
async function findOne(req, res, next) {
    try {
        const result = await expenses_model_1.Expenses.findOne({
            _id: new mongodb_1.ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Expense with id "${req.params.id}" not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
exports.findOne = findOne;
async function updateOne(req, res, next) {
    try {
        const result = await expenses_model_1.Expenses.findOneAndUpdate({
            _id: new mongodb_1.ObjectId(req.params.id),
        }, {
            $set: req.body,
        }, {
            returnDocument: 'after',
        });
        if (!result.value) {
            res.status(404);
            throw new Error(`Expense with id "${req.params.id}" not found`);
        }
        res.json(result.value);
    }
    catch (error) {
        next(error);
    }
}
exports.updateOne = updateOne;
async function deleteOne(req, res, next) {
    try {
        const result = await expenses_model_1.Expenses.findOneAndDelete({
            _id: new mongodb_1.ObjectId(req.params.id),
        });
        if (!result.value) {
            res.status(404);
            throw new Error(`Expense with id "${req.params.id}" not found`);
        }
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=expenses.handlers.js.map