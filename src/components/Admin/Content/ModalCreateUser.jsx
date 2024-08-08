import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";
import { useTranslation } from "react-i18next";
const ModalCreateUser = (props) => {
  const { show, setShow, fetchGetAllUsersWithPaginate, setCurrentPage } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitCreateUser = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email !");
      return;
    }

    if (!password) {
      toast.error("Invalid Password !");
      return;
    }

    let data = await postCreateNewUser(email, password, username, role, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchGetAllUsers();
      setCurrentPage(1);
      await fetchGetAllUsersWithPaginate(1);
    } else {
      toast.error(data.EM);
    }
  };
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
          <Modal.Title>{t("createuser.title")}</Modal.Title>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputRole" className="form-label">
                {t("modaluser.input.select.role.label")}
              </label>
              <select
                id="inputRole"
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
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
                <FcPlus />
                {t("modaluser.input.file")}
              </label>
              <input
                type="file"
                id="fileUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
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
            {t("createuser.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("createuser.btn.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
