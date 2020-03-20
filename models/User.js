const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin : {
        type: Boolean,
        default: false 
 }
})

module.exports = mongoose.model('User', userSchema)