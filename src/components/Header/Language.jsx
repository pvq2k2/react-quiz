import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const Language = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? `Tiếng Việt` : "English"}
        id="basic-nav-dropdown1"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Tiếng Việt
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
