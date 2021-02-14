import LocalStorageService from './LocalStorageService';
import { homeRoute, loginRoute } from '../constants/strings';
class AuthService {
  getUser() {
    return LocalStorageService.get('user');
  }

  isAuthenticated() {
    let user = LocalStorageService.get('user');
    if (user === null || user === '') return false;
    if (user.token === '') return false;
    return true;
  }
}

export default new AuthService();
