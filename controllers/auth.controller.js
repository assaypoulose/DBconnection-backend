const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = require('../models/users.model');
const jwt = require('jsonwebtoken');

//payload contains : - name, email, password, mobileNumber, roleNumber, bloodGroup

exports.register = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.password) {
            return res.status(400).send({ message: 'Password is mandatory' });
        }
        const hashValue = await bcrypt.hash(payload.password, 15); // 15-> salting rounds (it can be any number - ideally between 5-20)
        payload.hashedPassword = hashValue;
        delete payload.password;

        // Now in the payload, the password will be replaced by hashedPassword

        const newUser = new Users(payload);
        const savedUser = await newUser.save(); // Save the user and await the Promise

        res.status(201).send({ userID: savedUser._id, message: 'User has been registered successfully.' });

    } catch (err) {
        // Check for specific error types and send appropriate error messages
        if (err instanceof mongoose.Error.ValidationError) {
            // Validation error occurred
            res.status(400).send({ message: 'Error while registering the user.', error: err.message });
        } else {
            // Other types of errors (e.g., database connection errors)
            res.status(500).send({ message: 'Internal Server Error', error: err.message });
        }
    }
};

exports.signin = async (req, res) => {
    try {
        // Check if the user exists
        const existingUser = await Users.findOne({ email: req.body.email });

        if (existingUser) {
            // Check the credentials
            const isValidCredentials = await bcrypt.compare(req.body.password, existingUser.hashedPassword);

            if (isValidCredentials) {
                const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY); // Encryption
                res.cookie('accessToken', token, { expires: new Date(Date.now() + 86400000), httpOnly: true }); // + 24 hours to milliseconds

                return res.status(200).send({ userId: existingUser._id, token: token, message: 'User logged in successfully.' });
            }

            return res.status(401).send({ message: 'Invalid password' });
        }

        return res.status(400).send({ message: 'User does not exist' });
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};


exports.signout = async (req, res) => {
    try{
        await res.clearCookie('accessToken');
        res.status(200).send({message: 'Signed out successfully.'})
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'})
    }
}