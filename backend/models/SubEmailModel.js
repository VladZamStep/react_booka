import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model("SubEmail", SubEmailSchema)