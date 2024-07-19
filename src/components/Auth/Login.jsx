import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import { IoMail, IoLockClosed } from "react-icons/io5";
import imageForm from "../../assets/signin-image.jpg";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email !");
      return;
    }

    if (!password) {
      toast.error("Invalid Password !");
      return;
    }

    setIsLoading(true);
    const res = await postLogin(email, password);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(loginAction(res));
      setIsLoading(false);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <section className="signin">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={imageForm} alt="singinimage" />
              </figure>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <div className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <IoMail className="icons" />
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <IoLockClosed className="icons" />
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group form-button d-flex align-items-center gap-2 justify-content-center">
                  <button
                    name="signup"
                    id="signup"
                    className="form-submit d-flex align-items-center gap-2 justify-content-center"
                    onClick={() => handleLogin()}
                    onKeyDown={(event) => handleKeyDown(event)}
                    disabled={isLoading}
                  >
                    {isLoading === true && (
                      <ImSpinner10 className="loader-icon" />
                    )}
                    <span>Login to React Quizz</span>
                  </button>
                </div>
                <div
                  className="signup-image-link"
                  onClick={() => navigate("/register")}
                >
                  Create an account
                </div>
                <div
                  className="signup-image-link"
                  onClick={() => navigate("/")}
                >
                  Go to homepage
                </div>
              </div>
              {/* <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="display-flex-center zmdi zmdi-google" />
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
