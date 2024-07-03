import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, setDataDelete, fetchGetAllUsers } = props;

  const handleClose = () => {
    setShow(false);
    setDataDelete({});
  };

  const handleSubmitDeleteUser = () => {};

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
