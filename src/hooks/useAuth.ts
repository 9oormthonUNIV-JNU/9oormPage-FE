import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // 토큰 설정
  const setAuthToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); // 예시: 토큰 만료 시간 1시간 후
    localStorage.setItem('expiration', expiration.toISOString());
  };

  // 토큰 삭제 (로그아웃)
  const removeAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    setToken(null);
  };

  // 토큰 불러오기 (만료 체크 포함)
  const getAuthToken = (): string | null => {
    const storedToken = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!storedToken || !expiration) return null;

    const expirationDate = new Date(expiration);
    if (new Date() > expirationDate) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      return null; // 토큰 만료 처리
    }

    return storedToken;
  };

  // 로그인 상태 체크 (만약 로그인이 필요하다면, 리다이렉트)
  const checkAuth = () => {
    const token = getAuthToken();
    if (!token) {
      alert('로그인이 필요합니다!');
      navigate('/'); // 리다이렉트
      return false;
    }
    return true;
  };

  return { token, setAuthToken, removeAuthToken, getAuthToken, checkAuth };
}
