import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUsers,
} from "../../../../services/apiService";
const ModalAssignQuiz = (props) => {
  const { show, setShow } = props;

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchGetAllQuiz();
    fetchGetAllUser();
  }, []);

  const fetchGetAllQuiz = async () => {
    const res = await getAllQuizForAdmin();

    if (res.EC === 0) {
      let listQuizMap = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(listQuizMap);
    }
  };

  const fetchGetAllUser = async () => {
    const res = await getAllUsers();

    if (res.EC === 0) {
      let listUserMap = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(listUserMap);
    }
  };

  const handleClose = () => setShow(false);

  const handleSubmitQuiz = async () => {
    // let res;
    // switch (typeModal) {
    //   case "CREATE": {
    //     if (!name || !description) {
    //       toast.error("Name or description is required !");
    //       return;
    //     }
    //     res = await postCreateNewQuiz(description, name, type?.value, image);
    //     break;
    //   }
    //   case "UPDATE": {
    //     if (!name || !description) {
    //       toast.error("Name or description is required !");
    //       return;
    //     }
    //     res = await putUpdateQuiz(
    //       dataQuiz.id,
    //       description,
    //       name,
    //       type?.value,
    //       image
    //     );
    //     break;
    //   }
    //   case "DELETE": {
    //     res = await deleteQuiz(dataQuiz.id);
    //     break;
    //   }
    //   default:
    //     break;
    // }
    // if (res && res.EC === 0) {
    //   toast.success(res.EM);
    //   await fetchGetAllQuiz();
    //   handleClose();
    // } else {
    //   toast.error(res.EM);
    // }
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
          <Modal.Title>Assign Quiz For User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="assign-quiz-container row">
            <div className="col-6 form-group">
              <label className="mb-2">Select quiz</label>
              <Select
                defaultValue={selectedQuiz}
                onChange={setSelectedQuiz}
                options={listQuiz}
              />
            </div>
            <div className="col-6 form-group">
              <label className="mb-2">Select user</label>
              <Select
                defaultValue={selectedUser}
                onChange={setSelectedUser}
                options={listUser}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitQuiz()}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAssignQuiz;
