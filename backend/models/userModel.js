const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation for email and password

    if (!email || !password) {
        throw Error('All fields mustbe filed')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    //get default values for determining if password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    //method that generates extra random characters to add onto a password to prevent password matching in the database
    //higher the value, the longer it takes to hack
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })


    return user

}

module.exports = mongoose.model('User', userSchema)