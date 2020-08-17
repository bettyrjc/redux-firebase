import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { login, startLogin, startGoogleLogin } from "../../action/authAction";

export const LoginScreen = () => {
  const [formValues, handleInput] = useForm({
    email: "bettfeferfy@hotmail.com",
    password: "bettyy",
  });
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state);

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInput}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInput}
        />

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
