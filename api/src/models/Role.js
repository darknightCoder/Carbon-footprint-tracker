import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
    },
});

const Role = mongoose.model('roles', roleSchema);

export default Role;