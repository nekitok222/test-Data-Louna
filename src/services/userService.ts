import bcrypt from 'bcrypt';
import { db } from '../db';

export const userService = {
    async register(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
            return { success: true };
        } catch (err) {
            return { success: false, error: 'User already exists' };
        }
    },

    async login(username: string, password: string) {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { success: false, error: 'Invalid credentials' };
        }
        return { success: true, data: { message: 'Login successful' } };
    },

    async changePassword(username: string, oldPassword: string, newPassword: string) {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return { success: false, error: 'Invalid credentials' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.none('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, username]);
        return { success: true };
    },
};
