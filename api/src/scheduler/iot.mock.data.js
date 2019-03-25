import cron from 'node-cron';
import rn from 'random-number';

let pushData = async() => {
    let gen = rn.generator({
        min: 0,
        max: 4,
        integer: false
    });

    let iotDeviceData = {};
    let response = {};

    let boilerLocation = {};
    boilerLocation.latitude = 28.123;
    boilerLocation.longitude = 120.51;

    response.sensors = [0 ,1];
    response.boilerLocation = boilerLocation;
    response.industryType = 1;
    response.industryName = "Purifier Industry";
    response.deviceId = [23, 59];
    response.boilerID = "BL736";

    let data = {};
    let gaseous = {};
    let liquid = {};    

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

        iotDeviceData.response = response
    });
};

export {
    pushData
}