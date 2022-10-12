"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExpenseHandlers = __importStar(require("./expenses.handlers"));
const expenses_model_1 = require("./expenses.model");
const ParamsWithId_1 = require("../../interfaces/ParamsWithId");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
// GET all expenses
router.get('/', ExpenseHandlers.findAll);
// GET expense by id
router.get('/:id', (0, middlewares_1.validateRequest)({
    params: ParamsWithId_1.ParamsWithId,
}), ExpenseHandlers.findOne);
// POST new expense
router.post('/', (0, middlewares_1.validateRequest)({
    body: expenses_model_1.Expense,
}), ExpenseHandlers.createOne);
// PUT expense by id
router.put('/:id', (0, middlewares_1.validateRequest)({
    params: ParamsWithId_1.ParamsWithId,
    body: expenses_model_1.Expense,
}), ExpenseHandlers.updateOne);
// DELETE expense by id
router.delete('/:id', (0, middlewares_1.validateRequest)({
    params: ParamsWithId_1.ParamsWithId,
}), ExpenseHandlers.deleteOne);
exports.default = router;
//# sourceMappingURL=expenses.routes.js.map