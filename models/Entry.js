import mongoose, { Schema } from "mongoose";

/**
 * description: 'description'
 * createdAt: Date.now()
 * status: 'pending'
 */


// definiendo un Schema
const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido',
        },
        default: 'pending',
    }
});

const EntryModel = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;