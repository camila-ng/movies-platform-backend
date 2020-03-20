const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name: {
        type: String
    },

    category: {
        type: []
    },

    image: {
        type: String
    },
    
    type: {
        type: []
    }
})


module.exports = module.exports = mongoose.model('Movie', movieSchema)
