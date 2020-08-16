import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import validator from "validator";

import { setUiError, removeUiError } from "../../action/ui";

import { useForm } from "../customHooks/useForm";
import { startRegister } from "../../action/authAction";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  // me va  a disparar un callback en el cual tengo un state
  const { msgError } = useSelector((state) => state.ui);
  console.log(msgError);

  const [formValues, handleInput] = useForm({
    name: "betty jimenez",
    email: "bettfeferfy@hotmail.com",
    password1: "bettyy",
    password2: "bettyy",
  });

  const { name, email, password1, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormvalid()) {
      dispatch(startRegister(email, password1, name));
    }
  };

  const isFormvalid = () => {
    if (name.trim().length === 0) {
      dispatch(setUiError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setUiError("Email is not valid"));

      return false;
    } else if (password1 !== password2 || password1.length < 5) {
      dispatch(setUiError("Password is not valid"));
      return false;
    }
    dispatch(removeUiError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        {msgError && <p className="auth__alert-error">{msgError}</p>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInput}
          value={name}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInput}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          name="password1"
          className="auth__input"
          onChange={handleInput}
          value={password1}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          onChange={handleInput}
          value={password2}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
