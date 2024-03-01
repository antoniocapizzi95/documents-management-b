const { Pool } = require('pg');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL
);
`;


module.exports = class DocumentRepository {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
          });
          this.initializeTableIfNotExists();
    }

    async initializeTableIfNotExists() {
        const client = await this.pool.connect();
        try {
          await this.pool.query(createTableQuery);
        } catch (error) {
          console.error('Could not create table "documents":', error);
        } finally {
          client.release();
        }
      }

    async addDocument(id, document) {
        return this.pool.query('INSERT INTO documents(id, content) VALUES($1, $2) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content', [id, document.content])
    }
}