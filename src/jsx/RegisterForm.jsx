import "../css/RegisterForm.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  registerToggleValue,
  loginToggleValue,
} from "../redux/slices/greetingPageSlice";
import { registerUser } from "../redux/slices/usersSlice";

function RegisterForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLoginToggle = () => {
    dispatch(loginToggleValue());
  };
  const handleRegisterToggle = () => {
    dispatch(registerToggleValue());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = { name, surname, email, password };

    try {
      const resultAction = await dispatch(registerUser(userData)).unwrap();
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      handleRegisterToggle();
      handleLoginToggle();
    } catch (error) {
      console.error("Register Is Not Done!", error);
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="nameRegister" className="registerNameLabel">
          Name
        </label>
        <input
          required
          type="text"
          name=""
          id="nameRegister"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surnameRegister" className="registerSurnameLabel">
          Surname
        </label>
        <input
          required
          type="text"
          name=""
          id="surnameRegister"
          onChange={(e) => setSurname(e.target.value)}
        />
        <label htmlFor="emailRegister" className="registerEmailLabel">
          Email
        </label>
        <input
          required
          type="email"
          name=""
          id="emailRegister"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="passwordRegister" className="registerPasswordLabel">
          Password
        </label>
        <input
          required
          type="password"
          name=""
          id="passwordRegister"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
