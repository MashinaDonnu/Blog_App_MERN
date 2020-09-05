const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')
const User = require('../models/User')
const auth = require('../middleware/authMiddleware')

router.post('/add', auth,  async (req, res) => {
    try {
        const {title, description, img} = req.body
        if(!title || !description) {
            return res.status(400).json({message: 'Fill in the fields (title, description)'})
        }
        const post = new Post({title, description, img, user: req.user.userId})
        post.save()
        res.json(true)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong...', error: e.message})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({user: req.user.userId})
        const userName = await User.findById({_id: req.user.userId})
        res.json({posts: posts.reverse(), user: userName.name})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong...', error: e.message})
    }
})

router.get('/edit/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        res.json(post)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong...', error: e.message})
    }
})

router.post('/edit', auth, async (req, res) => {
    const {_id, title, description, img} = req.body.post
    try {
        if(!title || !description) {
            return res.status(400).json({message: 'Fill in the fields (title, description)'})
        }
        await Post.findByIdAndUpdate({_id}, {title, description, img})
        res.json(true)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong...', error: e.message})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById({_id: req.params.id})
        await Post.findByIdAndDelete({_id: req.params.id})
        res.json(post.title)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong...', error: e.message})
    }
})

module.exports = router