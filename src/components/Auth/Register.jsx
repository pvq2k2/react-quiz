import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email !");
      return;
    }

    if (!password) {
      toast.error("Invalid Password !");
      return;
    }

    if (!username) {
      toast.error("Invalid Username !");
      return;
    }
    const res = await postRegister(email, username, password);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
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
          Get better data with conversational forms, surveys, quizzes & more.
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
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="bruce wayne"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="form-group mt-4">
            <button
              className="btn btn-dark w-100"
              onClick={() => handleRegister()}
            >
              Register to React Quizz
            </button>
          </div>
          <div className="header d-flex flex-column justify-content-end align-items-center gap-3 mt-3">
            <span>Already have an account?</span>
            <button
              className="btn btn-outline-dark text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
