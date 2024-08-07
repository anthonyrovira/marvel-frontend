import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useAuthModal = (handleModalVisibility: VoidFunction) => {
  const [, setCookie] = useCookies(["user_token"]);

  const [loginView, setLoginView] = useState<boolean>(true);

  const [authFormData, setAuthFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [greenButton, setGreenButton] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = useCallback(
    (token: string) => {
      setCookie("user_token", token, { path: "/", secure: true, httpOnly: true });
    },
    [setCookie]
  );

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        if (!loginView && !authFormData.username) {
          return setErrorMessage("Username is missing");
        }
        if (!authFormData.email) {
          return setErrorMessage("Email is missing");
        }
        if (!authFormData.password) {
          return setErrorMessage("Password is missing");
        }
        setGreenButton(" green-button");

        let response;
        if (loginView) {
          const data = { email: authFormData.email, password: authFormData.password };

          response = await axios.post(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/user/login`, data);
        } else {
          const data = { username: authFormData.username, email: authFormData.email, password: authFormData.password };

          response = await axios.post(`${import.meta.env.VITE_HYSTERIA_BACKEND_URL}/user/signup`, data);
        }

        if (response.data && response.status === 200) {
          const token = response.data.token;
          const username = response.data.username;
          setAuthFormData((prevData) => ({ ...prevData, username }));
          setErrorMessage("");
          handleLogin(token);
          handleModalVisibility();
          navigate("/");
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (loginView) {
            if (error.response?.status === 401) {
              setErrorMessage("Wrong email or password");
            } else if (error.response?.status === 404) {
              setErrorMessage("This email doesn't have an account");
            } else {
              setErrorMessage("A problem occurred, try again later");
            }
          } else if (error.response?.status === 409) {
            setErrorMessage("User already exists");
          } else {
            setErrorMessage("A problem occurred, try again later");
          }
        }
      }
    },
    [authFormData, handleModalVisibility, handleLogin, loginView, navigate]
  );

  return {
    loginView,
    setLoginView,
    authFormData,
    errorMessage,
    greenButton,
    handleInputChange,
    handleSubmit,
  };
};

export default useAuthModal;
