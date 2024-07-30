import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Language from "../../components/Header/Language";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../../services/apiService";
import { logoutAction } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className="leftside" />
          </span>
          <div className="rightside">
            <Language />
            <NavDropdown
              title={`${t("admin.navdropdow.title")}, ${account.username}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                {t("admin.navdropdow.profile")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleLogOut()}>
                {t("admin.navdropdow.logout")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
