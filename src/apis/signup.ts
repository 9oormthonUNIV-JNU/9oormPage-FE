import { instance } from "./instance";

type SignupData = {
    email: string;
    password: string;
    name: string;
    user_cardinal: string;
    user_part: string;
  }
  
  export const postSignup = async (data: SignupData) => {
    try {
      const result = await instance.post("/api/user/signup", data);
      return result;
    } catch (error) {
        console.error("회원가입 오류 : ", error)
    }
  };

  export const sendEmail = async (email: string) => {
    try {
        const result = await instance.post("/api/user/sendemail", email);
        return result;
    } catch (error) {
        console.error("이메일 인증코드 요청 오류 : ", error);
    }
  };  
  
  export const postCode = async (email: string, usercode: number)=> {
    try {
        const result = await instance.post("/api/user/authentication", {email, usercode})
        return result;
    } catch (error) {
        console.log("이메일 인증코드 불일치 오류 : ", error);
    }
  }

