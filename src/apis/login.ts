import { instance } from "./instance";

export const postLogin = async (email: string, password: string) => {
    try {
        const response = await instance.post("/api/user/login", {
            email, password
        });

        if(response.data.success) {
            const token = response.headers.authorization;
            const {email, role, approved} = response.data.response;

            localStorage.setItem('token', token);
            localStorage.setItem('email',email);
            localStorage.setItem('role', role);

            return { success:true, approved };
        } else {
            return { success:false, error: "아이디 또는 비밀번호가 틀렸습니다." };
        }

    } catch (error) {
        console.error(error);
        return { success: false, error: "로그인 중 오류가 발생했습니다." };
    }  
}

export const logout = () => {
    localStorage.removeItem('token');
    console.log('로그아웃');
  };