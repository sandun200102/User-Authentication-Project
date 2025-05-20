import { generateKey } from 'crypto';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Validate the request body
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
         const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({ 
            email, 
            password : hashedPassword, 
            name ,
            role : 'user',
            verificationToken ,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000, // 24 hour

        });
        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);
            res.status(200).json({ 
                success: true,
                message: 'User created successfully',
                user:{
                    ...user._doc,
                    password: undefined,
                },
            });

        

    } catch (error) {
        res.status(400).json({ message: 'Internal server error' });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }
        // if (user.verificationTokenExpiresAt < Date.now()) {
        //     return res.status(400).json({ message: 'Verification code has expired' });
        // }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Send a welcome email
        await sendWelcomeEmail(user.email, user.name);
        
        // Send a success response
        res.status(200).json({ 
            success: true,
            message: 'Email verified successfully',
            user:{
                ...user._doc,
                password: undefined,
            },
        
        });

    } catch (error) {
        res.status(400).json({ message: 'Internal server error' });
    }
}
export const login = async (req, res) => {
    res.send('Login route');
}
export const logout = async (req, res) => {
    res.send('Logout route');
}