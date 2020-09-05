const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    img:String,
    user:{type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Post', schema)