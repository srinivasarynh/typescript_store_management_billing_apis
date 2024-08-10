import express from "express";
import { createBill, getAllBills, getBill, deleteBill } from "../controllers/billController";
import { validateBill } from "../validators";
import { validateRequest } from "../middlewares/validate-request";
import { errorHandler } from "../middlewares/error-handler";

const router = express.Router();


router.post('/', validateBill, validateRequest, errorHandler, createBill);
router.get('/', getAllBills);
router.get('/:id', getBill);
router.delete('/:id', deleteBill);

export { router as billRouter };
