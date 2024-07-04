import "./LayoutAuth.scss";
const LayoutAuth = (props) => {
  return (
    <>
      <div className="layout-auth-container">
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="content d-flex justify-content-center">
          <div className="col-3">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
