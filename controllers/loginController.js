const Login = require('../models/loginModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {name,email,password,role,vendorName,vendorAddress,vendorLicense} = req.body;
    try {
        if (role != 'admin' && role != 'user' && role != 'vendor') {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const registerDetails = await Login.create({
            id: uuidv4(),
            name: name,
            email: email,
            password:password, 
            role: role,
            vendorName:role=='vendor'?vendorName:undefined,
            vendorAddress:role=='vendor'?vendorAddress:undefined,
            vendorLicense:role=='vendor'?vendorLicense:undefined,
        })
        if (registerDetails) {
            return res.status(200).json({ message: 'Registration successful' });
        }
        else {
            return res.status(404).json({ message: "Registration failed" });
        }
    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    const { name, password, role } = req.body;
    try {
        const loginDetails = await Login.findOne({ name });
        if (!loginDetails) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (loginDetails.role != role) {
            return res.status(401).json({ message: 'Invalid role' });
        }
        const isValidPassword = await bcrypt.compare(password, loginDetails.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const details = { authId: loginDetails.id, role: role }
        const token = jwt.sign(details, "secret_key", {
            expiresIn: '1h'
        });
        return res.json({ token });

    } catch (err) {
        console.log(err);
    }
}

module.exports = { register, login };