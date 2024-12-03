import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const isTokenValid = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

export { isTokenValid };
