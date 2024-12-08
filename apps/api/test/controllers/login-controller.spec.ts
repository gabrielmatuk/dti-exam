import { Hono } from 'hono';
import LoginController from '../../src/controllers/login.controller';
import { generateToken } from '../../src/utils/jwt';
import loginServices from '../../src/services/login.services';

jest.mock('../../src/utils/jwt');
jest.mock('../../src/services/login.services');
jest.mock('bcrypt');

describe('LoginController', () => {
  const app = new Hono();
  const loginController = LoginController;
  app.post('/login', (c) => loginController.login(c));

  it('should return token on successful login', async () => {
    const mockGenerateToken = generateToken as jest.Mock;
    const mockToken = 'mocked-token';
    mockGenerateToken.mockResolvedValue(mockToken);
    const mockIsValidPassword = loginServices.isValidUserPassword as jest.Mock;
    mockIsValidPassword.mockResolvedValue(true);

    const response = await app.request('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@domain.com',
        password: 'password123',
        username: 'testuser',
      })
    });

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody).toHaveProperty('token', mockToken);
  });

  it('should return 422 if input is invalid', async () => {
    const invalidInput = {
      email: 'invalid-email',
      password: '',
    };

    const response = await app.request('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidInput),
    });

    const responseBody = await response.json();

    expect(response.status).toBe(422);
    expect(responseBody.errors).toBeDefined();
  });

  it('should return 422 if missing pswd validation', async () => {
    const invalidInput = {
      email: 'test@domain.com',
      password: '',
    };

    const response = await app.request('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidInput),
    });

    const responseBody = await response.json();

    expect(response.status).toBe(422);
    expect(responseBody.errors).toBeDefined();
  });

  it('should handle unexpected errors gracefully', async () => {
    const mockGenerateToken = generateToken as jest.Mock;
    mockGenerateToken.mockRejectedValue(new Error('Unexpected error'));

    const response = await app.request('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@domain.com',
        password: 'password123',
        username: 'testuser',
      })
    });

    expect(response.status).toBe(500);
  });
});
