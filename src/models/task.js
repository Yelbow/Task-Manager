const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
        
    }
})

// const carrots = new Task({
//     description: 'make a carrot cake',
//     completed: false
// })

// carrots.save().then(() => {
//     console.log(carrots)
// }).catch((err) => {
//     console.log('niet gelukt', err)
// })

module.exports = Task