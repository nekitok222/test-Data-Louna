import { db } from '../db';

export const purchaseService = {
    async makePurchase(userId: number, productId: number) {
        const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);
        const product = await db.oneOrNone('SELECT * FROM products WHERE id = $1', [productId]);

        if (!user || !product || user.balance < product.price) {
            return { success: false, error: 'Invalid purchase' };
        }

        try {
            await db.tx(async (t) => {
                await t.none('UPDATE users SET balance = balance - $1 WHERE id = $2', [product.price, userId]);
                await t.none('INSERT INTO purchases (user_id, product_id) VALUES ($1, $2)', [userId, productId]);
            });

            const updatedUser = await db.one('SELECT balance FROM users WHERE id = $1', [userId]);
            return { success: true, data: { message: 'Purchase successful', balance: updatedUser.balance } };
        } catch (err) {
            return { success: false, error: 'Database error' };
        }
    },
};
