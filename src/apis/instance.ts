import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {},
  withCredentials: true,
});

// 관리자 토큰 확인 함수
export function checkAdminToken() {
  const token = localStorage.getItem('token');
  if (!token || token !== import.meta.env.VITE_ADMIN_TOKEN) {
    // 관리자 토큰이 아니면 리디렉션 혹은 에러 처리
    alert('관리자 권한이 없습니다.');
    window.location.href = '/'; // 홈 페이지로 리디렉션
  }
  return token;
}

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 관리자 페이지일 경우 관리자 토큰 확인
    if (config.url?.includes("/admin")) {
      checkAdminToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized 처리
    if (error.response && error.response.status === 401) {
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      window.location.href = '/login';  // 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);
