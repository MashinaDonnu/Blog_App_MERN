const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')
const app = express()

app.use(express.json({extended: true}))
app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/user', userRoute)

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 3000
async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`Blog app started on port: ${PORT}...`)
        })
    } catch (e) {
        console.error('Error', e)
        process.exit(1)
    }
}

start()