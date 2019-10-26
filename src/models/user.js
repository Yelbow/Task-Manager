const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('./task')


const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!isEmail(value)){
                throw new Error('emailadress is invalid')
            } 
        }        
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error('your password can not contain the word password')
            }
        }
    },  
    age: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
    
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: Task,
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismysecrativesecret')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const object = this.toObject()

    delete object.password
    delete object.tokens

    return object

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = User.findOne({email})

    if(!user){
        throw new Error('no existing user with this emailadress')
    }

    const isMatch = bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('incorrect password with this emailadress')
    }

    return user
}

// hash password before saving
userSchema.pre('save', async function(next) {

    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})
// delete tasks when user is removed
userSchema.pre('remove', async function(next) {

    await Task.deleteMany({owner: this._id})
    next()
})

const User = mongoose.model('users', userSchema )

module.exports = User