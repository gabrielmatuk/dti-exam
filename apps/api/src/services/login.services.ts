import * as bcrypt from 'bcrypt';
import { UserServices } from './user.services';

class LoginServices extends UserServices {
  async isValidUserPassword(email: string, password: string): Promise<boolean> {
    const userInDatabase = await this.findUniqueUserByEmail(email);
    if (!userInDatabase) {
      return false;
    }
    const isValidPassword = await bcrypt.compare(password, userInDatabase.password);
    return isValidPassword;
  }
}

export default new LoginServices();
