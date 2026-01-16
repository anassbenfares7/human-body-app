import { Pool } from 'pg';
import { ORGANS_DATA } from '@human-body/shared';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const organService = {
  async getAll() {
    const result = await pool.query('SELECT * FROM organs ORDER BY name');
    return result.rows;
  },

  async getById(id: string) {
    const result = await pool.query('SELECT * FROM organs WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async getBySystem(systemId: string) {
    const result = await pool.query(
      'SELECT * FROM organs WHERE system = $1 ORDER BY name',
      [systemId]
    );
    return result.rows;
  },

  async search(query: string) {
    const searchTerm = `%${query.toLowerCase()}%`;
    const result = await pool.query(
      `SELECT * FROM organs 
       WHERE LOWER(name) LIKE $1 
       OR LOWER(system) LIKE $1 
       OR LOWER(function) LIKE $1
       ORDER BY name`,
      [searchTerm]
    );
    return result.rows;
  },

  async seedOrgans() {
    for (const organ of ORGANS_DATA) {
      await pool.query(
        `INSERT INTO organs (id, name, system, location, function, model_path, position, info, related_organs)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           system = EXCLUDED.system,
           location = EXCLUDED.location,
           function = EXCLUDED.function,
           model_path = EXCLUDED.model_path,
           position = EXCLUDED.position,
           info = EXCLUDED.info,
           related_organs = EXCLUDED.related_organs`,
        [
          organ.id,
          organ.name,
          organ.system,
          organ.location,
          organ.function,
          organ.modelPath,
          JSON.stringify(organ.position),
          JSON.stringify(organ.info),
          organ.relatedOrgans
        ]
      );
    }
  }
};
