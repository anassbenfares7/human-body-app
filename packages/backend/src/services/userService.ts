import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const userService = {
  async getProfile(userId: string) {
    const result = await pool.query(
      'SELECT id, email, subscription_tier, created_at FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0];
  },

  async updateProfile(userId: string, updates: any) {
    const fields = [];
    const values = [];
    let index = 1;

    if (updates.email) {
      fields.push(`email = $${index}`);
      values.push(updates.email);
      index++;
    }

    const setClause = fields.join(', ');
    const result = await pool.query(
      `UPDATE users SET ${setClause} WHERE id = $${index + 1}`,
      [...values, userId]
    );
    return result.rows[0];
  }
};
