const request = require('supertest');
const express = require('express');
const app = express();

// Basic route for testing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

describe('API Endpoints', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
