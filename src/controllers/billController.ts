import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { Bill } from "../models/bills";
import { deleteOne, getOne, getAll } from "./handleFactory";
import AppError from "../utils/appError";
import purchaseItem from '../services/purchaseService';
import catchAsync from '../utils/catchAsync';


export const createBill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { item_id, quantity, price_per_unit, total_price, customer_name } = req.body;
    try {
        const result = await purchaseItem(new Types.ObjectId(item_id), quantity, price_per_unit, total_price, customer_name);
        res.status(201).json({
            message: 'Purchase successful',
            data: result
        });

    } catch (error) {
        return next(new AppError('Purchase failed', 400));
    }
});

export const getBill = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Bill.findById(req.params.id).populate({
        path: 'item_id',
        select: 'name price description category'
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const getAllBills = getAll(Bill);
export const deleteBill = deleteOne(Bill)




