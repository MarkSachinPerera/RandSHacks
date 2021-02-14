import LocalStorageService from './LocalStorageService';
import { userKey, homeRoute, loginRoute } from '../constants/strings';

class AuthService {
  authRouteHandler(history) {
    if (this.isAuthenticated()) {
      LocalStorageService.delete(userKey);
      history.push(homeRoute);
    } else {
      history.push(loginRoute);
    }
  }
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
