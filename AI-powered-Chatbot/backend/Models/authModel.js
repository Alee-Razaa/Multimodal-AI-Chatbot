const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true
    },
    email:{
        type:String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // for security: don't return password in queries unless explicitly asked

    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date

    },
    {timestamps:true} // adds createdAt and updatedAt
)

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next()
    try{
        const salt = await bcrypt.genSalt(10)
        this.password =await bcrypt.hash(this.password,salt)
        next()
    }catch(err){
        next(err)
    }
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


const users = mongoose.model('validusers',userSchema)

module.exports = users