import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { useTranslation } from "react-i18next";
const ModalViewUser = (props) => {
  const { show, setShow, dataView, setDataView } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewImage("");
    setDataView({});
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setUsername(dataView.username);
      setRole(dataView.role);
      if (dataView.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [dataView]);
  return (
    <>
      <Modal
        show={show}
        size="xl"
        backdrop="static"
        className="modal-add-user"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("detailuser.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                {t("modaluser.input.email")}
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                {t("modaluser.input.password")}
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputUsername" className="form-label">
                {t("modaluser.input.username")}
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                value={username}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputRole" className="form-label">
                {t("modaluser.input.select.role.label")}
              </label>
              <select
                id="inputRole"
                className="form-select"
                value={role}
                disabled
              >
                <option value="USER">
                  {t("modaluser.input.select.role.option.user")}
                </option>
                <option value="ADMIN">
                  {t("modaluser.input.select.role.option.admin")}
                </option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="fileUpload" className="form-label label-upload">
                {t("detailuser.image")}
              </label>
              <input type="file" id="fileUpload" hidden disabled />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="img preview" />
              ) : (
                <span>{t("modaluser.input.previewimage")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("detailuser.btn.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
