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
    org: {
        type: String,
    },
    channel: {
        type: String,
    },
    peers: {
        type: [String],
    }
});

const User = mongoose.model('users', userSchema);

export default User;