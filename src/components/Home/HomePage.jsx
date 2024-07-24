import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <div className="container">
        <div className="home-title">
          <h1>{t("homepage.title1")}</h1>
          <p>{t("homepage.title2")}</p>
          {isAuthenticated === false ? (
            <button className="btn btn-dark" onClick={() => navigate("/login")}>
              {t("homepage.title3.login")}
            </button>
          ) : (
            <button className="btn btn-dark" onClick={() => navigate("/users")}>
              {t("homepage.title3.nologin")}
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
