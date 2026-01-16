import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const quizService = {
  async getAll(userId: string) {
    const result = await pool.query(
      'SELECT * FROM quiz_results WHERE user_id = $1 ORDER BY completed_at DESC',
      [userId]
    );
    return result.rows;
  },

  async getByOrgan(userId: string, organId: string) {
    const result = await pool.query(
      'SELECT * FROM quiz_results WHERE user_id = $1 AND organ_id = $2 ORDER BY completed_at DESC',
      [userId, organId]
    );
    return result.rows;
  },

  async submitResult(userId: string, organId: string, score: number, totalQuestions: number) {
    const result = await pool.query(
      `INSERT INTO quiz_results (user_id, organ_id, score, total_questions, completed_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, organ_id) DO UPDATE SET
         score = EXCLUDED.score,
         total_questions = EXCLUDED.total_questions,
         completed_at = EXCLUDED.completed_at
       RETURNING *`,
      [userId, organId, score, totalQuestions, new Date().toISOString()]
    );
    return result.rows[0];
  }
};
