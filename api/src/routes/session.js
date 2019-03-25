import express from 'express';

const {
    login,
    authorityLogin
} = require('../business/session.service');

const router = express.Router();

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        let userDetails = await login(email, password);
        res.status(200).json(userDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/authorities/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        let authorityDetails = await authorityLogin(email, password);
        res.status(200).json(authorityDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;