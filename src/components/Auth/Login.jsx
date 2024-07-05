import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
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
  return (
    <>
      <div className="form-box w-100 p-5">
        <div className="title mx-auto text-center fs-3 fw-bold">
          <Link to="/" className="text-white">
            React Quizz
          </Link>
        </div>
        <div className="welcome mx-auto my-2 text-center fs-6">
          Hello, who’s this?
        </div>
        <div className="content-form mx-auto">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="bruce@wayne.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="#"
            className="my-2 fs-6 text-decoration-underline d-block text-white"
          >
            Forgot password ?
          </Link>

          <div className="form-group mt-4">
            <button
              className="btn btn-dark w-100 d-flex align-items-center gap-2 justify-content-center"
              onClick={() => handleLogin()}
              disabled={isLoading}
            >
              {isLoading === true && <ImSpinner10 className="loader-icon" />}
              <span>Login to React Quizz</span>
            </button>
          </div>
          <div className="header d-flex flex-column justify-content-end align-items-center gap-3 mt-3">
            <span>Don't have an account yet?</span>
            <button
              className="btn btn-outline-dark text-white"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
