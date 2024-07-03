import { Link } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {};
  return (
    <>
      <div className="login-container">
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="content d-flex justify-content-center">
          <div className="col-3">
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
                    className="btn btn-dark w-100"
                    onClick={() => handleLogin()}
                  >
                    Login to React Quizz
                  </button>
                </div>
                <div className="header d-flex flex-column justify-content-end align-items-center gap-3 mt-3">
                  <span>Don't have an account yet?</span>
                  <button className="btn btn-outline-dark text-white">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
