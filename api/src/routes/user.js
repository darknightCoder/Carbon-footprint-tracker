import express from 'express';

const {
    saveUser,
    getUser,
    getUsers
} = require('../business/user.service');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, password, role, org, channel } = req.body;
    try {
        let userDetails = await saveUser(name, email, password, role, org, channel);
        res.status(200).json(userDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let userDetails = await getUser(id);
        res.status(200).json(userDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        let userDetailsList = await getUsers();
        res.status(200).json(userDetailsList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;