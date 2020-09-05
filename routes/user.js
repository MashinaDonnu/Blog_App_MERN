const {Router} = require('express')
const router = Router()
const auth = require('../middleware/authMiddleware')
const User = require('../models/User')
const config = require('config')
const Cryptr = require('cryptr')

const cryptr = new Cryptr(config.get('secret'))

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const {name, email, password} = await User.findById(id)
        const decodePassword = cryptr.decrypt(password)
        res.json({name, email, password: decodePassword})
    } catch (e) {
        return res.status(500).json({message: 'Something went wrong...', error: e})
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const {name, email, password, _id} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({message: 'Fill in the fields (title, description)'})
        }
        await User.findByIdAndUpdate({_id}, {name, email, password: cryptr.encrypt(password)})
        res.json({message: 'Data is updated'})
    } catch (e) {
        return res.status(500).json({message: 'Something went wrong...', error: e})
    }
})

module.exports = router