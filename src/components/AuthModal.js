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
          return setErrorMessage("Missing username");
        }
      }
      if (!email) {
        return setErrorMessage("Missing email");
      }
      if (!password) {
        return setErrorMessage("Missing password");
      }
      setErrorMessage("");

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

      if (response.data) {
        const token = response.data.token;
        //console.log(token);
        const username = response.data.username;
        setUsernameMain(username);
        handleLogin(token);
        handleModalVisibility();
        //history.push("/");
      } else {
        alert("User does not have an account");
        console.log(errorMessage);
      }
    } catch (error) {
      console.log(error);
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
                  className="input-modal"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              )}
              <input
                className="input-modal"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                className="input-modal"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {!login ? (
              <>
                <button type="submit" className="button-modal btn">
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
                <button type="submit" className="button-modal btn">
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
