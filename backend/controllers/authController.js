import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const registerUser = async (req, res,next) => {
    const { firstName, lastName, age, qualification, email, password, role,avatar } = req.body;

    if (!firstName || !lastName || !age || !qualification || !email || !password || !role) {
        return next(createError(400, "Please fill all the fields"))
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError(400, "Email is already registered. Please use a different email."));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User(
            {
                password: hashedPassword,
                role,
                email,
                firstName,
                lastName,
                age,
                avatar,
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
            expiresIn: '15s'
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
        }).status(201).json({ message: "login successful", accessToken: accessToken,role:otherDetails.role });
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
        console.log(user,"user dataaaaaa");
        

        const accessToken = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT,
            { expiresIn: '15s' }
        );

        res.status(200).json({ accessToken: accessToken,role:user.role });
        console.log(accessToken);
    });
};

export const logOut = (req, res) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "logged out successfully" })
}



export const getAllUserExceptCurrentUser = async (req, res, next) => {
    try {
        const currentUserId = req.user.id; 
        const users = await User.find({ _id: { $ne: currentUserId } });

        const usersWithFullName = users.map(user => ({
            ...user.toObject(),
            fullName: `${user.firstName} ${user.lastName}`
        }));

        res.status(200).json(usersWithFullName);
    } catch (error) {
        next(error);
    }
};

export const getUserById=async(req,res,next)=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const getCurrentUser=async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}


export const updateCurrentUserDetails = async (req, res,next) => {
    try { 
        const updates = req.body; 
        const user = await User.findByIdAndUpdate(req.user.id, updates, {
            new: true, 
            runValidators: true, 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User details updated successfully", user });
    } catch (error) {
      next()
    }
};

export const updateUserDetails = async (req, res,next) => {
    try {
        const { id } = req.params; 
        const updates = req.body; 

        
        const user = await User.findByIdAndUpdate(id, updates, {
            new: true, 
            runValidators: true, 
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User details updated successfully", user });
    } catch (error) {
      next()
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        next(error);
    }
};

export const getRecentUser = async (req, res) => {
    try {
        const students = await User.find().sort({ createdAt: -1 }).limit(7);
        res.status(200).json(students);
    } catch (error) {
        console.error("Error retrieving recent students:", error);
        res.status(500).json({ message: "Error retrieving recent students" });
    }
};