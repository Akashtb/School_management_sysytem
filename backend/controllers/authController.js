import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const registerUser = async (req, res,next) => {
    const { firstName, lastName, age, qualification, username, email, password, role } = req.body;

    if (!firstName || !lastName || !age || !qualification || !username || !email || !password || !role) {
        return next(createError(400, "Please fill all the fields"))
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User(
            {
                username,
                password: hashedPassword,
                role,
                email,
                firstName,
                lastName,
                age,
                qualification,
            }
        )
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json(error)
    }
}


export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "user not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Invalid password"))

        const accessToken = jwt.sign({
            id: user._id,
            role: user.role
        },
            process.env.JWT, {
            expiresIn: '30m'
        }
        )
        const { _id, password, ...otherDetails } = user._doc




        const refreshToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT,
            { expiresIn: '7d' });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(201).json({ message: "login successful", otherDetails, accessToken: accessToken });
    } catch (err) {
        res.status(500).json(error)
    }
}


export const refreshToken = (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return next(createError(401, "No refresh token"));

    jwt.verify(refreshToken, process.env.JWT, (err, user) => {
        console.log("user data in refresh token", user);

        if (err) return next(createError(403, "Invalid refresh token"));

        const accessToken = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT,
            { expiresIn: '15s' }
        );

        res.status(200).json({ accessToken: accessToken });
        console.log(accessToken);
    });
};

export const logOut = (req, res) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "logged out successfully" })
}

