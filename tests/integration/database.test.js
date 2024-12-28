const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

describe('Database Connection', () => {
  let connection;

  beforeAll(async () => {
    dotenv.config();
  });

  test('should connect to database', async () => {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      });
      expect(connection).toBeDefined();
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  });

  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });
});
