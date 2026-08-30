const request = require('supertest');
const app = require('../app');
const db = require('../db');

// afterAll(async () => {
//   await db.end();
// });

test('User register hona chahiye aur 201 status aana chahiye', async () => {
  const uniqueEmail = `test_${Date.now()}@test.com`;

  const res = await request(app)
    .post('/api/register')
    .send({
      name: 'Alex',
      email: uniqueEmail,
      password: 'password123'
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe('User registered successfully');
});