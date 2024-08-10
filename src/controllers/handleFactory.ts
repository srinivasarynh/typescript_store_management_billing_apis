import { Response, Request, NextFunction } from "express";
import catchAsync from './../utils/catchAsync';
import AppError from './../utils/appError';


export const deleteOne = (Model: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

export const updateOne = (Model: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const createOne = (Model: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    });
});

export const getOne = (Model: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: doc
    });
});

export const getAll = (Model: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const docs = await Model.find()

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: docs
    });
});