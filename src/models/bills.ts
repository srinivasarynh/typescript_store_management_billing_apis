import { model, Schema, Document } from 'mongoose'


// Bill Interface
export interface IBill extends Document {
    item_id: Schema.Types.ObjectId;
    name: string;
    quantity: number;
    price_per_unit: number;
    total_price: number;
    customer_name?: string;
    total_amount: number;
    created_at: Date;
}


const BillSchema = new Schema<IBill>({
    item_id: {
        type: Schema.Types.ObjectId,
        ref: 'Item', required: true
    },
    name: String,
    quantity: {
        type: Number,
        required: true
    },
    price_per_unit: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    customer_name: String,
    total_amount: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Bill = model<IBill>('Bill', BillSchema);
