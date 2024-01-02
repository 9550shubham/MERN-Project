const User = require("../models/user-model")
const bcrypt = require("bcryptjs");
const PORT = 5000;
const home = async (req, res) => {
    try {
        res.status(200).send(`hey port : ${PORT}`)
    } catch (error) {
        res.status(400).send({ msg: "page not found" })
    }
}

const register = async (req, res) => {
    try {
        // data=req.body;
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        // console.log(userExist);
        if (userExist) return res.status(401).json({ msg: "email already exist" });

        const userCreate = await User.create({ username, email, phone, password });
        if (userCreate) return res.status(200).json({
            msg: "created successfully",
            token: await userCreate.generateToken(),
            userId: userCreate._id.toString(),
        });


    } catch (error) {
        res.status(500).send({ msg: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) return res.status(400).json({ msg: "Please SignUp first" });
        const isPassValid = await userExist.compPass(password);
        if (isPassValid) {
            return res.status(200).json({
                msg: "Login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(400).json({ msg: "Invalid Credentials" });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { home, register, login };