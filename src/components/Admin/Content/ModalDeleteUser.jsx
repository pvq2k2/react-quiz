import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    dataDelete,
    setDataDelete,
    fetchGetAllUsersWithPaginate,
    setCurrentPage,
  } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    setDataDelete({});
  };

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);

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
      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("deleteuser.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("deleteuser.body")}
          <br /> Email:
          <b> {dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("deleteuser.btn.cancel")}
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            {t("deleteuser.btn.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
