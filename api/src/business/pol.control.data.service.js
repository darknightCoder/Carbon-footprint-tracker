let airPollutionControlData = async() => {
    try {
        const data = [{
            "parameter": "PM2.5",
            "fromData": "07-03-2019 15:00",
            "toData": "07-03-2019 15:30",
            "concentration": 31.37,
            "unit": "ug/m3"
        }, {
            "parameter": "PM10",
            "fromData": "07-03-2019 15:00",
            "toData": "07-03-2019 15:30",
            "concentration": 85.78,
            "unit": "ug/m3"
        }, {
            "parameter": "NO",
            "fromData": "07-03-2019 15:00",
            "toData": "07-03-2019 15:30",
            "concentration": 40.07,
            "unit": "ug/m3"
        }, {
            "parameter": "NOx",
            "fromData": "07-03-2019 15:00",
            "toData": "07-03-2019 15:30",
            "concentration": 64.63,
            "unit": "ppb"
        }]

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
    airPollutionControlData    
}