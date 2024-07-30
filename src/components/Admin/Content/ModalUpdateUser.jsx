import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiService";
import _ from "lodash";
import { useTranslation } from "react-i18next";
const ModalUpdateUser = (props) => {
  const {
    show,
    setShow,
    dataUpdate,
    setDataUpdate,
    fetchGetAllUsersWithPaginate,
    currentPage,
  } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    setDataUpdate({});
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitUpdateUser = async () => {
    let data = await putUpdateUser(dataUpdate.id, username, role, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await fetchGetAllUsers();
      await fetchGetAllUsersWithPaginate(currentPage);
    }
    if (data && data.EC !== 0) {
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
          <Modal.Title>{t("updateuser.title")}</Modal.Title>
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
                disabled
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
            {t("updateuser.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            {t("updateuser.btn.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
