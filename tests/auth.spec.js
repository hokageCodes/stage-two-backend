const request = require('supertest');
const app = require('../app'); // Assuming this is your Express app
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Wait for database sync
});

describe('Authentication Endpoints', () => {
  // Test successful user registration
  it('should register a new user successfully with default organisation', async () => {
    const registrationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/auth/register')
      .send(registrationData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email', registrationData.email);
    // Add more specific checks if needed
  });

  // Test successful user login
  it('should log in an existing user successfully', async () => {
    const loginData = {
      email: 'john@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/auth/login')
      .send(loginData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    // Add checks for authentication token or other relevant data
  });

  // Test missing required fields during registration
  it('should fail if required fields are missing', async () => {
    const invalidRegistrationData = {
      // Omit required fields intentionally
    };

    const res = await request(app)
      .post('/auth/register')
      .send(invalidRegistrationData);

    expect(res.statusCode).toEqual(422);
    // Add checks for error messages
  });

  // Test duplicate email during registration
  it('should fail if there is a duplicate email', async () => {
    // Register a user with the same email as above
    const duplicateRegistrationData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'john@example.com', // Same email as before
      password: 'password456',
    };

    const res = await request(app)
      .post('/auth/register')
      .send(duplicateRegistrationData);

    expect(res.statusCode).toEqual(422);
    // Add checks for error messages
  });
});
