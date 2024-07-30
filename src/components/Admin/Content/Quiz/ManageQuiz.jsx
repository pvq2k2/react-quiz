import React, { useEffect, useState } from "react";
import "./ManageQuiz.scss";
import TableQuiz from "./TableQuiz";
import ModalQuiz from "./ModalQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalAssignQuiz from "./ModalAssignQuiz";
import { useTranslation } from "react-i18next";
const ManageQuiz = () => {
  const [typeModal, setTypeModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalAssign, setShowModalAssign] = useState(false);
  const [dataQuiz, setDataQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchGetAllQuiz();
  }, []);

  const fetchGetAllQuiz = async () => {
    const res = await getAllQuizForAdmin();

    if (res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleModal = (type, data = null) => {
    setTypeModal(type);
    if (data) {
      setDataQuiz(data);
    }
    setShowModal(true);
  };

  return (
    <div className="quiz-container">
      <div className="title">{t("managequiz.title")}</div>
      <div className="py-3 d-flex gap-5">
        <button
          className="btn btn-primary"
          onClick={() => handleModal("CREATE")}
        >
          {t("managequiz.btn.addquiz")}
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalAssign(true)}
        >
          {t("managequiz.btn.assignquiz")}
        </button>
      </div>

      <div className="list-detail">
        <TableQuiz
          listQuiz={listQuiz}
          handleModal={handleModal}
          fetchGetAllQuiz={fetchGetAllQuiz}
        />
      </div>

      <ModalQuiz
        show={showModal}
        setShow={setShowModal}
        typeModal={typeModal}
        dataQuiz={dataQuiz}
        setDataQuiz={setDataQuiz}
        fetchGetAllQuiz={fetchGetAllQuiz}
      />

      <ModalAssignQuiz show={showModalAssign} setShow={setShowModalAssign} />
    </div>
  );
};

export default ManageQuiz;
