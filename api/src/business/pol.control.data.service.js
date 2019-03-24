let airPollutionControlData = async () => {
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

let averageAQIdata = async () => {
    try {
        const aqi = [{
            data: [190, 200, 198, 220, 190, 250, 200, 190, 200, 310, 400, 350],
            year: 2018
        },
        {
            data: [300, 280, 198, 220, 245, 250, 200, 230, 200, 310, 420, 350],
            year: 2017
        },
        {
            data: [190, 280, 198, 220, 245, 250, 200, 190, 200, 310, 400, 350],
            year: 2016
        }

        ]
        return Promise.resolve(aqi);
    } catch (error) {
        return Promise.reject(error);
    }
}

export {
    airPollutionControlData,
    averageAQIdata
}