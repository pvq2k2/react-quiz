import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { IoPerson, IoMail, IoLockClosed } from "react-icons/io5";
import imageForm from "../../assets/signup-image.jpg";
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
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <div className="register-form" id="register-form">
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
                  <label htmlFor="username">
                    <IoPerson className="icons" />
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <div className="form-group form-button d-flex justify-content-center">
                  <button
                    name="signup"
                    id="signup"
                    className="form-submit"
                    onClick={() => handleRegister()}
                  >
                    Register to React Quizz
                  </button>
                </div>

                <div
                  className="signup-image-link"
                  onClick={() => navigate("/login")}
                >
                  I am already member
                </div>
                <div
                  className="signup-image-link"
                  onClick={() => navigate("/")}
                >
                  Go to homepage
                </div>
              </div>
            </div>
            <div className="signup-image">
              <figure>
                <img src={imageForm} alt="singupimage" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
