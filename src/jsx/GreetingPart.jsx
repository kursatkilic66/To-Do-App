import { useDispatch } from "react-redux";
import {
  loginToggleValue,
  registerToggleValue,
} from "../redux/slices/greetingPageSlice.jsx";

function GreetingPart() {
  const dispatch = useDispatch();
  const handleLoginToggle = () => {
    dispatch(loginToggleValue());
  };
  const handleRegisterToggle = () => {
    dispatch(registerToggleValue());
  };
  return (
    <div>
      <h2 className="login-title">Uygulamaya Giriş Yapabilmek İçin</h2>
      <div className="login-button-container">
        <input
          onClick={() => handleLoginToggle()}
          type="button"
          className="login-button"
          value="Giriş Yap"
        />
      </div>
      <p className="login-info">Eğer Üyeliğin Yoksa</p>
      <div className="register-button-container">
        <input
          onClick={() => handleRegisterToggle()}
          type="button"
          className="register-button"
          value="Kayıt Ol"
        />
      </div>
    </div>
  );
}

export default GreetingPart;
