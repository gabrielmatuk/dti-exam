import LoginServices from '../../src/services/login.services';
import * as bcrypt from 'bcrypt';
jest.mock('bcrypt');

describe('LoginServices', () => {
  describe('isValidUserPassword', () => {
    it('should return true if password is valid', async () => {
      const email = 'test@domain.com';
      const password = 'password123';
      const mockUser = {
        id: 1,
        email: 'test@domain.com',
        password: 'hashedPassword123',
        createdAt: new Date(),
        isActive: true,
        role: 'user',
        name: 'Test User',
      };

      const mockFindUniqueUserByEmail = jest.spyOn(LoginServices, 'findUniqueUserByEmail').mockResolvedValue(mockUser);

      const mockBcryptCompare = bcrypt.compare as jest.Mock;
      mockBcryptCompare.mockResolvedValue(true);

      const result = await LoginServices.isValidUserPassword(email, password);

      expect(result).toBe(true);
      expect(mockFindUniqueUserByEmail).toHaveBeenCalledWith(email);
      expect(mockBcryptCompare).toHaveBeenCalledWith(password, mockUser.password);
    });

    it('should return false if password is invalid', async () => {
      const email = 'test@domain.com';
      const password = 'wrongPassword';
      const mockUser = {
        id: 1,
        email: 'test@domain.com',
        password: 'hashedPassword123',
        createdAt: new Date(),
        isActive: true,
        role: 'user',
        name: 'Test User',
      };

      const mockFindUniqueUserByEmail = jest.spyOn(LoginServices, 'findUniqueUserByEmail').mockResolvedValue(mockUser);

      const mockBcryptCompare = bcrypt.compare as jest.Mock;
      mockBcryptCompare.mockResolvedValue(false);

      const result = await LoginServices.isValidUserPassword(email, password);

      expect(result).toBe(false);
      expect(mockFindUniqueUserByEmail).toHaveBeenCalledWith(email);
      expect(mockBcryptCompare).toHaveBeenCalledWith(password, mockUser.password);
    });

    it('should return false if user is not found', async () => {
      const email = 'nonexistent@domain.com';
      const password = 'password123';
      const mockFindUniqueUserByEmail = jest.spyOn(LoginServices, 'findUniqueUserByEmail').mockResolvedValue(null);

      const result = await LoginServices.isValidUserPassword(email, password);

      expect(result).toBe(false);
      expect(mockFindUniqueUserByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw an error if unexpected error occurs', async () => {
      const email = 'test@domain.com';
      const password = 'password123';

      const mockFindUniqueUserByEmail = jest.spyOn(LoginServices, 'findUniqueUserByEmail').mockRejectedValue(new Error('Database error'));

      await expect(LoginServices.isValidUserPassword(email, password)).rejects.toThrow('Database error');
      expect(mockFindUniqueUserByEmail).toHaveBeenCalledWith(email);
    });
  });
});
