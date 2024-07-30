import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const ModalAssignQuiz = (props) => {
  const { show, setShow } = props;
  const { t } = useTranslation();
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
          label: `${item.id} - ${item.name}`,
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

  const handleAssignQuiz = async () => {
    const res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    } else {
      toast.error(res.EM);
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
          <Modal.Title>{t("modalassignquiz.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="assign-quiz-container row">
            <div className="col-6 form-group">
              <label className="mb-2">{t("modalassignquiz.selectquiz")}</label>
              <Select
                defaultValue={selectedQuiz}
                onChange={setSelectedQuiz}
                options={listQuiz}
              />
            </div>
            <div className="col-6 form-group">
              <label className="mb-2">{t("modalassignquiz.selectuser")}</label>
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
            {t("modalassignquiz.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleAssignQuiz()}>
            {t("modalassignquiz.btn.assign")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAssignQuiz;
