import cron from 'node-cron';
import rn from 'random-number';
import request from 'request';

const { getDevicesByBoilerID } = require('../business/device.service');

let pushData = async() => {
    let gen = rn.generator({
        min: 0,
        max: 4,
        integer: false
    });

    let iotDeviceData = {};
    let response = {};
    response.boilerID = "BL736";
    response.deviceId = [];

    let deviceDetailsList = await getDevicesByBoilerID('BL736');

    deviceDetailsList.forEach((deviceDetails) => {
        response.deviceId.push(deviceDetails.deviceId);
    });

    let boilerLocation = {};
    boilerLocation.latitude = "28.123N";
    boilerLocation.longitude = "120.51E";

    response.sensors = [0 ,1];      
    response.boilerLocation = boilerLocation;
    response.industryType = 1;
    response.industryName = "Purifier Industry";    

    let data = {};
    let gaseous = {};
    let liquid = {};    

    let url = ''; //TODO - URL path

    cron.schedule("* * * * *", function() {
        gaseous.NH3 = gen().toString();
        gaseous.NOx = gen().toString();
        gaseous.sulphur = gen().toString();
        gaseous.phosphorus = gen().toString();
        gaseous.CO = gen().toString();
        gaseous.CO2 = gen().toString();
        gaseous.SO2 = gen().toString();
        gaseous.CH4 = gen().toString();

        liquid.alcohol = gen(7,10).toString();
        liquid.benzene = gen(6,8).toString();
        liquid.silicon = gen(2,3).toString();

        data.gaseous = gaseous;
        data.liquid = liquid;

        response.data = data;

        iotDeviceData.response = response;

        console.log(JSON.stringify(iotDeviceData));

        var options = {
            method: 'post',
            body: iotDeviceData,
            json: true,
            url: url
        }

        request(options, function (err, res, body) {
            if (err) {
              console.error('error posting json: ', err);
              throw err;
            }
            var headers = res.headers
            var statusCode = res.statusCode
            console.log('headers: ', headers)
            console.log('statusCode: ', statusCode)
            console.log('body: ', body)
        })
    });
};

export {
    pushData
}