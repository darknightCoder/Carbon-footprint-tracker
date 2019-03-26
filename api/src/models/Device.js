import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    deviceId : {
        type: String,
    },
    deviceType: {
        type: String,
    },
    boilerId: {
        type: String,        
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String
    },
});

const Device = mongoose.model('devices', deviceSchema);

export default Device;
