import { model, Schema, Document } from 'mongoose'

// Item Interface
export interface IItem extends Document {
    name: string;
    description?: string;
    category?: string;
    price: number;
    quantity_in_stock: number;
    created_at?: Date;
    updated_at?: Date;
}


const ItemSchema = new Schema<IItem>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity_in_stock: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export const Item = model<IItem>('Item', ItemSchema);
