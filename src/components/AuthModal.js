import React, { useState } from "react";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import marvel from "../assets/img/Marvel-Logo.jpg";

const LoginModal = (props) => {
  const { handleModalVisibility, handleLogin, setUsernameMain } = props;
  const [login, setLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [greenButton, setGreenButton] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!login) {
        if (!username) {
          return setErrorMessage("Username is missing");
        }
      }
      if (!email) {
        return setErrorMessage("Email is missing");
      }
      if (!password) {
        return setErrorMessage("Password is missing");
      }
      setGreenButton(" green-button");

      let response;
      if (!login) {
        const data = { username, email, password };
        response = await axios.post(
          "https://marvel-hysteria9.herokuapp.com/user/signup",
          data
        );
      } else {
        const data = { email, password };
        response = await axios.post(
          "https://marvel-hysteria9.herokuapp.com/user/login",
          data
        );
      }

      if (response.data && response.status === 200) {
        const token = response.data.token;
        const username = response.data.username;
        setUsernameMain(username);
        setErrorMessage("");
        handleLogin(token);
        handleModalVisibility();
        //history.push("/");
      } else {
        setErrorMessage(response.error.message);
      }
    } catch (error) {
      console.log(error.response);
      if (!login) {
        if (error.response.status === 409) {
          setErrorMessage("User already exists");
        } else {
          setErrorMessage("A problem occurred, try again later");
        }
      } else {
        if (error.response.status === 401) {
          setErrorMessage("Wrong email or password");
        } else if (error.response.status === 404) {
          setErrorMessage("This email doesn't have an account");
        } else {
          setErrorMessage("A problem occurred, try again later");
        }
      }
    }
  };

  return (
    <div className="modal-container" /*{className}*/>
      <div className="centered-container">
        <div className="form-container">
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            className="close-logo"
            onClick={handleModalVisibility}
          ></FontAwesomeIcon>
          <img src={marvel} alt="marvel logo" />
          <form
            className="auth-form-container"
            action=""
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="inputs-form-container">
              {!login && (
                <input
                  className={
                    errorMessage === "Username is missing"
                      ? "input-modal-error"
                      : "input-modal"
                  }
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              )}
              <input
                className={
                  errorMessage === "Email is missing"
                    ? "input-modal-error"
                    : "input-modal"
                }
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                className={
                  errorMessage === "Password is missing"
                    ? "input-modal-error"
                    : "input-modal"
                }
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {!login ? (
              <>
                {errorMessage !== "" && (
                  <p className="sign-error-message">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className={`button-modal btn${greenButton}`}
                >
                  Sign Up
                </button>
                <p>
                  Already have an account ?{" "}
                  <span
                    className="hyperlink"
                    onClick={() => {
                      setLogin(!login);
                    }}
                  >
                    Sign In
                  </span>
                </p>
              </>
            ) : (
              <>
                {errorMessage !== "" && (
                  <p className="sign-error-message">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className={`button-modal btn${greenButton}`}
                >
                  Sign In
                </button>
                <p>
                  Not yet registered ?{" "}
                  <span
                    className="hyperlink"
                    onClick={() => {
                      setLogin(!login);
                    }}
                  >
                    Sign Up now !
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
