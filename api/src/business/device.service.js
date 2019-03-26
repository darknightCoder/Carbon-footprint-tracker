import Device from '../models/Device';

let saveDevice = async(deviceId, deviceType, boilerId, longitude, latitude) => {
    try {
        let response = {};
        response.deviceId = deviceId;
        response.deviceType = deviceType;
        response.boilerId = boilerId;
        response.longitude = longitude;
        response.latitude = latitude;
        await Device.create({ deviceId: deviceId, deviceType: deviceType, boilerId: boilerId, longitude: longitude, latitude: latitude}, (err, obj) => {
            if(!err) {
                JSON.parse(JSON.stringify(obj));                
                response = obj;
            }
        });
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getDeviceDetails = async(id) => {
    try {
        let deviceDetails = {};
        await Device.findById(id, (err, obj) => {
            if(!err) {
                JSON.parse(JSON.stringify(obj));                
                deviceDetails = obj;
            }
        });
        return Promise.resolve(deviceDetails);
    } catch(err) {
        return Promise.reject(err);
    }
};

let getAllDevices = async() => {
    try {
        let devicesDetailsList = [];
        await Device.find({}, (err, obj) => {
            if(!err) {
                JSON.parse(JSON.stringify(obj));
                devicesDetailsList = obj;
            }
        });
        return Promise.resolve(devicesDetailsList);
    } catch (err) {
        return Promise.reject(err);
    }
};

let getDevicesByBoilerID = async(id) => {
    try {
        let deviceDetailsList = [];        
        await Device.find({ boilerId: id }, (err, obj) => {
            if(!err) {
                JSON.parse(JSON.stringify(obj));
                deviceDetailsList = obj;
            }
        });
        return Promise.resolve(deviceDetailsList);
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
    saveDevice,
    getDeviceDetails,
    getAllDevices,
    getDevicesByBoilerID
}