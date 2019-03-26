import express from 'express';

const {
    saveDevice,
    getDeviceDetails,
    getAllDevices,
    getDevicesByBoilerID
} = require('../business/device.service');

const router = express.Router();

router.post('/', async(req, res) => {
    const { deviceId, deviceType, boilerId, longitude, latitude } = req.body;
    try {
        let deviceDetails = await saveDevice(deviceId, deviceType, boilerId, longitude, latitude);
        res.status(200).json(deviceDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        let deviceDetails = await getDeviceDetails(id);
        res.status(200).json(deviceDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/boilers/:id', async(req, res) => {
    const { id } = req.params;    
    try {
        let deviceDetails = await getDevicesByBoilerID(id);
        res.status(200).json(deviceDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async(req, res) => {
    try {
        let deviceDetailsList = await getAllDevices();
        res.status(200).json(deviceDetailsList);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;