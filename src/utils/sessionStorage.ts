class SessionDB {
  static getAccessToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch (e) {
      return null;
    }
  }

  static setAccessToken(token: string | null) {
    try {
      if (token === null) localStorage.removeItem('token');
      else localStorage.setItem('token', token);
    } catch (e) {
      // ignore
    }
  }
}

export default SessionDB;
