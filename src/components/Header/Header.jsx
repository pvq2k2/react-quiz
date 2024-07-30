import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { logoutAction } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import Language from "./Language";
import { useTranslation } from "react-i18next";
const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogOut = async () => {
    let res = await postLogout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(logoutAction());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          React Quizz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("headerhome.navlink.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("headerhome.navlink.user")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("headerhome.navlink.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <NavDropdown
                title={`${t("headerhome.navdropdow.title")}, ${
                  account.username
                }`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  {t("headerhome.navdropdow.profile")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("headerhome.navdropdow.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-3">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleLogin()}
                >
                  {t("headerhome.btn.login")}
                </button>
                <button className="btn btn-dark">
                  {t("headerhome.btn.signup")}
                </button>
              </div>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
