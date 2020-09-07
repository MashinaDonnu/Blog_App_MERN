const {Router} = require('express')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Cryptr = require('cryptr')
const router = Router()

const cryptr = new Cryptr(config.get('secret'))

router.post(
    '/registration',
    [
        check('email', 'Email is not valid!').isEmail(),
        check('password', 'Password is not valid').isLength({min:5})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Register data is not valid'
            })
        }

        const {email, password, name} = req.body
        const candidate = await User.findOne({email})

        if(candidate) {
            return  res.status(400).json({message: 'This email already exists'})
        }

        // const hashPassword = await bcrypt.hash(password, 12)
        const hashPassword = cryptr.encrypt(password)
        const user = new User({email, password: hashPassword, name})

        await user.save()

        res.status(201).json({message: 'Registration successful', reg: true})

    } catch (e) {
        return  res.status(500).json({message: 'Something went wrong...', errors: e.message})
    }
})

router.post(
    '/login',
    [
        check('email').isEmail(),
        check('password').exists()
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Register data is not valid'
            })
        }


        const {email, password} = req.body
        console.log(email)

        const user = await User.findOne({email})




        if (!user) {
            return res.status(400).json({message:`User email "${email}" not found`})
        }



        const decodePassword = cryptr.decrypt(user.password)
        const validPassword = decodePassword === password

        // const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message:`Invalid password`})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('secret'),
            {expiresIn:'1h'}
        )
        res.json({token, userId: user.id})
    } catch (e) {
        return res.status(500).json({message: 'Something went wrong...'})
    }
})

module.exports = router