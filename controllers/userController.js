const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

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

    // res.json(user)
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


module.exports = { registerUser, loginUser, currentUser }