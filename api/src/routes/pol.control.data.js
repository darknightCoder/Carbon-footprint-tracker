import express from 'express';

const {
    airPollutionControlData
} = require('../business/pol.control.data.service');
import {averageAQIdata} from '../business/pol.control.data.service'
const router = express.Router();

router.get('/air', async(req, res) => {
    try {
        let airQualityData = await airPollutionControlData();
        res.status(200).json(airQualityData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/aqi', async(req, res) => {
    console.log("reached in");
    try {
        let aqi = await averageAQIdata();
        res.status(200).json(aqi);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;