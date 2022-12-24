const User = require('../Models/User.js');
const jwt = require('jsonwebtoken');

// handle errors 

const handleErrors = (err) => {
    console.log(err.message)
    let errors = { email: "", password: "" }
    if (err.message === "email incorrect") {
        errors.email = 'That email is not registered'
    }
    if (err.message === 'password incorrect') {
        errors.password = 'That password is incorrect';
    }
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
    if (err.message.includes('User validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors
}
const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}
const signup_post = async (req, res) => {

    const { email, password, name, phone } = req.body
    try {
        const user = await User.create({ email, password, name, phone })
        const Token = createToken(user._id)
        res.status(201).json({ user: user._id, Token })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
const login_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const Token = createToken(user._id)
        res.status(200).json({ user: user._id, Token })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
module.exports = {
    login_post,
    signup_post
}