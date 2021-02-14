import LocalStorageService from './LocalStorageService';
import { userKey } from '../constants/strings';

class AuthService {
  getUser() {
    return LocalStorageService.get(userKey);
  }

  isAuthenticated() {
    let user = LocalStorageService.get(userKey);
    if (user === null || user === '') return false;
    if (user.token === '') return false;
    return true;
  }
}

export default new AuthService();
