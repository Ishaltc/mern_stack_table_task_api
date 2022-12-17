import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    count: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required:true
    },
    date:{
        type:String,
        required:true

    },
    number:{
        type:String,
        required:true
    }
}, { timestamps: true })

export default mongoose.model('Data', dataSchema)