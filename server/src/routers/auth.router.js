const express = require('express');
const router = express.Router();
const StudentModel = require('../models/students.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {register} = require("../services/register.service")


router.post('/login', async (req, res) => {
    try {
        let username = req.body.user
        let password = req.body.password
       
        const user = await StudentModel.getStudentByUserName(username);


        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Senha incorreta!' });
        }

        const token = jwt.sign({ userId: user._id, subject: user.name, role:user.role}, 'your-secret-key', {
            expiresIn: '1h',
        });

        

        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});



module.exports = router;