import { useEffect, useState } from "react";
import "../css/LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const loggedUserIdSelector = useSelector(
    (state) => state.usersSlice.currentUser
  );

  const handleLogin = (e) => {
    e.preventDefault();
    let loginData = { email, password };
    dispatch(loginUser(loginData));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (loggedUserIdSelector) {
      setIsLoggedIn(true);

      setEmail("");
      setPassword("");
    }
  }, [loggedUserIdSelector]);

  useEffect(() => {
    if (isLoggedIn) {
      navigator("/HomePage");
    }
  }, [isLoggedIn, navigator]);

  return (
    <div className="loginFormContainer">
      <form className="loginForm" onSubmit={handleLogin}>
        <label for="email1" className="emailLabel">
          Email
        </label>
        <input
          type="email"
          id="email1"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label for="password1" className="passwordLabel">
          Password
        </label>
        <input
          type="password"
          id="password1"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="loginButton">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
