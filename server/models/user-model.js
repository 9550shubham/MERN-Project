const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

//hashing password
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next();
    }
    try {
        // const salt=10;
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(user.password, salt);
        user.password = hash_pass;
    } catch (error) {
        next(error);
    }

})

//json web token
userSchema.methods.generateToken = async function () { //instance method
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.SECRET_KEY,
        )
    } catch (error) {
        console.error(error);
    }
}

//comparing password
userSchema.methods.compPass = async function(checkPass){
    try {
        // console.log(this);
        return bcrypt.compare(checkPass,this.password)
    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model("User", userSchema);//collection name
module.exports = User;