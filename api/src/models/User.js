import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,        
    },
    name: {
        type: String
    },
    role: {
        type: Number, ref: 'roles'
    },
});

const User = mongoose.model('users', userSchema);

export default User;