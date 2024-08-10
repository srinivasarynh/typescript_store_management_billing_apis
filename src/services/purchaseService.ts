import { Types } from 'mongoose';
import { Item } from '../models/item';
import { Bill } from '../models/bills';
import AppError from '../utils/appError';

async function purchaseItem(itemId: Types.ObjectId, purchaseQuantity: number, purchasePrice: number, total_price: number, customerName?: string) {
    try {
        const item = await Item.findOne({ _id: itemId });

        if (!item) {
            throw new AppError('Item not found', 404);
        }

        if (purchasePrice < item.price) {
            throw new AppError('Purchase price is less than item price', 400);
        }

        // Check if there is enough stock
        if (purchaseQuantity > item.quantity_in_stock) {
            throw new AppError('Not enough stock available', 400);
        }

        // Calculate the total price
        const totalPrice = purchaseQuantity * purchasePrice;
        if (total_price < totalPrice) {
            throw new AppError(`Total price is less than ${totalPrice}`, 400);
        }
        // Calculate the new stock quantity
        const newQuantityInStock = item.quantity_in_stock - purchaseQuantity;

        // Update the item quantity in stock
        await Item.updateOne(
            { _id: itemId },
            { $set: { quantity_in_stock: newQuantityInStock } }
        );


        const bill = new Bill({
            item_id: itemId,
            name: item.name,
            quantity: purchaseQuantity,
            price_per_unit: purchasePrice,
            total_price: totalPrice,
            customer_name: customerName,
            total_amount: totalPrice,
            created_at: new Date()
        });

        const savedbill = await bill.save();
        await savedbill.populate({
            path: 'item_id',
            select: 'name price description category'
        });
        return savedbill;
    } catch (error) {
        throw new AppError(`Error during purchase: ${error}`, 400);
    }
}


export default purchaseItem;