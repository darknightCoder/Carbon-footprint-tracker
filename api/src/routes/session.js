import express from 'express';

const {
    login
} = require('../business/session.service');

const router = express.Router();

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        let userDetails = await login(username, password);
        res.status(200).json(userDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;