import { Response, Request, NextFunction } from "express";
import AppError from './../utils/appError';
import config from "../config";

const handleCastErrorDB = (err: any,) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDocumentNotFound = (err: any,) => {
    const message = `Item not found`;
    return new AppError(message, 404);
}

const handleDuplicateFieldsDB = (err: any,) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleInvalidId = (err: any,) => {
    const message = `Invalid Id.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any,) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};


const sendErrorDev = (err: any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

};

const sendErrorProd = (err: any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }

};

export const errorController = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (config.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;

        if (error.statusCode === 404) error = handleDocumentNotFound(error);
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.kind === "ObjectId") error = handleInvalidId(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);

        sendErrorProd(error, req, res);
    }
};