const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name."],
    },
    email: {
        type: String,
        require: [true, "A user must have email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not same'
        }
    },
    passwordChangedAt: {
        type: Date
    }
    // password: {
    //     require: [true, "A user must have set his password for his account."]
    // }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestamp < changedTimestamp
    }

    return false;
}

const Users = mongoose.model('Users', userSchema);


module.exports = Users