import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import GreetingPart from "./GreetingPart.jsx";
import { useSelector } from "react-redux";
import "../css/GreetingPage.css";

function GreetingPage() {
  const loginSelector = useSelector((state) => state.toggle.loginToggle);
  const registerSelector = useSelector((state) => state.toggle.registerToggle);

  return (
    <div className="login-container">
      {!loginSelector && !registerSelector && <GreetingPart />}
      {loginSelector && <LoginForm />}
      {registerSelector && <RegisterForm />}
    </div>
  );
}

export default GreetingPage;
