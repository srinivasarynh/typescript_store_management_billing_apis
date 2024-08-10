import express from "express";
import { addItem, getAllItems, getItem, updateItem, deleteItem } from "../controllers/itemController";
import { validateItem, validateUpdateItem } from "../validators";
import { validateRequest } from "../middlewares/validate-request";
import { errorHandler } from "../middlewares/error-handler";

const router = express.Router();

router.post('/', validateItem, validateRequest, errorHandler, addItem);
router.get('/', getAllItems);
router.get('/:id', getItem);
router.put('/:id', validateUpdateItem, validateRequest, errorHandler, updateItem);
router.delete('/:id', deleteItem);

export { router as itemRouter };
