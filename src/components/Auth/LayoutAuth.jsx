import "./LayoutAuth.scss";
const LayoutAuth = (props) => {
  return (
    <>
      <div className="layout-auth-container">
        <div className="main">{props.children}</div>
      </div>
    </>
  );
};

export default LayoutAuth;
