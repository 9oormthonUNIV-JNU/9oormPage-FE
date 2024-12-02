import LoginLogoTemplate from "../components/common/templates/LoginLogoTemplate";
import LoginTemplate from "../components/common/templates/LoginTemplate";

const LoginPage = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <LoginLogoTemplate />
      </div>
      <div className="flex-1">
        <LoginTemplate />
      </div>
    </div>
  );
};

export default LoginPage;
