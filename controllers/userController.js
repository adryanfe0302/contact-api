const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const nodemailer = require('nodemailer');
const fs = require('fs');

const registerUser = asyncHandler(async (req,res) => {
    const { username, email, password, role } = req.body;

    if(!username || !email || !password){
        res.status(400)
        throw new Error(`all field is mandatory`)
    }

    const checkUserExisting = await User.findOne({email})
    if(checkUserExisting){
        res.status(400)
        throw new Error(`user already register`)
    }
    const hashpassword = await bcrypt.hash(password, 10)
    console.log('hashpassword', hashpassword);
    console.log('role', role);

    const user = await User.create({
        username,
        email,
        password: hashpassword,
        role: role || 'user'
    })

    if(user){
        res.status(201).json({
            _id:user.id, 
            email: user.email,
            role: user.role || 'user'
        })
    } else {
        res.status(400)
        throw new Error('user not valid')
    }
    res.json(user)
})


const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    if( !email || !password){
        res.status(400)
        throw new Error('please add the email and password')
    }

    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
            process.env.ACCESS_TOKEN_ID,
            { expiresIn: "5h" }
        )
        res.status(200).json({ 
            accessToken })
    } else {
        res.status(401)
        throw new Error('email or password not valid')
    }

})

const currentUser = asyncHandler(async (req,res) => {

    const currentUser = await User.findById(req.user.id)
    const returnData = {
        email: currentUser.email,
        role: currentUser.role || 'user',
        username: currentUser.username 
    }
    res.status(200).json(returnData)

    // res.status(200).json(req.user)
})

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'adryanfernandom2@gmail.com',
        pass: process.env.EMAIL_PASS,
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const Htmltemplate = require('../email_template/index.html');

const forgotUser = asyncHandler(async (req, res) => {
    const email = await User.find()
    const isemailExist = email.filter(item => item.email === req.body.email )

    if(isemailExist.length > 0){
        // const {to, subject, text } = req.body;
        const mailData = {
            from: 'adryanfernandom2@gmail.com',
            to: req.body.email,
            subject: 'please verify your email2',
            text: 'please click link below to verify your email',
            html: Htmltemplate
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.log('error', error);
                return console.log(error);
            }
         
            res.status(200).json({
                status: 'verification already sent to you email',
                message_id: info.messageId
            })
        });
    } else {
        res.status(400)
        throw new Error('email not valid')
    }
    
})


module.exports = { registerUser, loginUser, currentUser, forgotUser }