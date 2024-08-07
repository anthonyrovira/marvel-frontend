import { X } from "lucide-react";
import marvel from "../assets/img/Marvel-Logo.jpg";
import useAuthModal from "../hooks/useAuthModal";
import { FC } from "react";

interface IAuthModal {
  handleModalVisibility: () => void;
}

const AuthModal: FC<IAuthModal> = ({ handleModalVisibility }) => {
  const { authFormData, errorMessage, greenButton, handleInputChange, handleSubmit, loginView, setLoginView } =
    useAuthModal(handleModalVisibility);

  return (
    <div className="modal-container">
      <div className="centered-container">
        <div className="form-container">
          <X className="close-logo" onClick={handleModalVisibility} />

          <img src={marvel} alt="marvel logo" />
          <form className="auth-form-container" action="" method="post" onSubmit={handleSubmit}>
            <div className="inputs-form-container">
              {!loginView && (
                <input
                  name="username"
                  className={errorMessage === "Username is missing" ? "input-modal-error" : "input-modal"}
                  type="text"
                  placeholder="Username"
                  value={authFormData.username}
                  onChange={handleInputChange}
                />
              )}
              <input
                name="email"
                className={errorMessage === "Email is missing" ? "input-modal-error" : "input-modal"}
                type="email"
                placeholder="Email"
                value={authFormData.email}
                onChange={handleInputChange}
              />
              <input
                name="password"
                className={errorMessage === "Password is missing" ? "input-modal-error" : "input-modal"}
                type="password"
                placeholder="Password"
                value={authFormData.password}
                onChange={handleInputChange}
              />
            </div>

            {loginView ? (
              <>
                {errorMessage !== "" && <p className="sign-error-message">{errorMessage}</p>}
                <button type="submit" className={`button-modal btn${greenButton}`}>
                  Sign In
                </button>
                <p>
                  Not yet registered ?{" "}
                  <span
                    className="hyperlink"
                    onClick={() => {
                      setLoginView(!loginView);
                    }}
                  >
                    Sign Up now !
                  </span>
                </p>
              </>
            ) : (
              <>
                {errorMessage !== "" && <p className="sign-error-message">{errorMessage}</p>}
                <button type="submit" className={`button-modal btn${greenButton}`}>
                  Sign Up
                </button>
                <p>
                  Already have an account ?{" "}
                  <span
                    className="hyperlink"
                    onClick={() => {
                      setLoginView(!loginView);
                    }}
                  >
                    Sign In
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

export default AuthModal;
