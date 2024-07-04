import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    dataDelete,
    setDataDelete,
    fetchGetAllUsersWithPaginate,
    setCurrentPage,
  } = props;

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
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this user.
          <br /> Email:
          <b> {dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
