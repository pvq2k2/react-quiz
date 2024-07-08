import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <div className="container">
        <div className="home-title">
          <h1>Make forms worth filling out</h1>
          <p>
            Get more data—like signups, feedback, and anything else—with forms
            designed to be refreshingly different.
          </p>
          {isAuthenticated === false ? (
            <button className="btn btn-dark" onClick={() => navigate("/login")}>
              Get started—it's free
            </button>
          ) : (
            <button className="btn btn-dark" onClick={() => navigate("/users")}>
              Doing Quiz Now !
            </button>
          )}
        </div>
      </div>
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomePage;
