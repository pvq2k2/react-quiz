import React from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <div id="error-page">
        <div class="content">
          <h2 class="header" data-text="404">
            404
          </h2>
          <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
          <p>
            Sorry, the page you're looking for doesn't exist. If you think
            something is broken, report a problem.
          </p>
          <div class="btns">
            <Link to="/">return home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
