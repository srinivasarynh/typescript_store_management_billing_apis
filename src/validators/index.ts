import { body, param } from 'express-validator';


export const validateItem = [
    body('name').trim().notEmpty().withMessage('Item must have Name'),
    body('description').trim().optional(),
    body('category').trim().optional(),
    body('price').notEmpty().isNumeric().withMessage('Price must be Number'),
    body('quantity_in_stock').notEmpty().isNumeric().withMessage('Quantity must be Number'),
    body('created_at').optional(),
    body('updated_at').optional(),
];


export const validateUpdateItem = [
    body('name').optional().trim(),
    body('description').optional().trim(),
    body('category').optional().trim(),
    body('price').optional().isNumeric(),
    body('quantity_in_stock').optional().isNumeric(),
];


export const validateBill = [
    body('item_id').notEmpty().withMessage('Item id required'),
    body('name').optional().trim(),
    body('quantity').notEmpty().isNumeric().withMessage("Quantity must be Number"),
    body('price_per_unit').notEmpty().isNumeric().withMessage("Price must be Number"),
    body('total_price').notEmpty().isNumeric().withMessage("Total Price must be Number"),
    body('customer_name').optional().trim(),
]
