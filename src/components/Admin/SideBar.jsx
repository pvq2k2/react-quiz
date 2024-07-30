import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";

import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import "./SideBar.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const { t } = useTranslation();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <span>{t("sidebar.brand")}</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              {t("sidebar.navitem.dashboard")}
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title={t("sidebar.navitem.features")}>
              <MenuItem>
                {t("sidebar.navitem.manageuser")}
                <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                {t("sidebar.navitem.managequizzes")}
                <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                {t("sidebar.navitem.managequestions")}
                <Link to="/admins/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <Link to="/" className="sidebar-btn" rel="noopener noreferrer">
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; {t("sidebar.backhome")}
              </span>
            </Link>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
