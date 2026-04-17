import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '../../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const registerUser = async (payload: User) => {
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    
    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        },
        select: { id: true, name: true, email: true, role: true, created_at: true }
    });
    return result;
};

const loginUser = async (payload: any) => {
    const isUserExist = await prisma.user.findUnique({
        where: { email: payload.email }
    });

    if (!isUserExist) throw new Error("User does not exist");

    const isPasswordMatched = await bcrypt.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) throw new Error("Password incorrect");

    const token = jwt.sign(
        { userId: isUserExist.id, role: isUserExist.role },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token };
};

export const AuthService = { registerUser, loginUser };