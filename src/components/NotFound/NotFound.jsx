import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found-container">
      <div id="error-page">
        <div class="content">
          <h2 class="header" data-text="404">
            404
          </h2>
          <h4 data-text="Opps! Page not found">{t("notfound.title1")}</h4>
          <p>{t("notfound.title2")}</p>
          <div class="btns">
            <Link to="/">{t("notfound.title3")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
