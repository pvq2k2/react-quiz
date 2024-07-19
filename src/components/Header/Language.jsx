import React from "react";
import { NavDropdown } from "react-bootstrap";

const Language = () => {
  return (
    <>
      <NavDropdown
        title={`Tiếng Việt`}
        id="basic-nav-dropdown1"
        className="languages"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Tiếng Việt</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
