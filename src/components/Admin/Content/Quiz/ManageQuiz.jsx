import React, { useEffect, useState } from "react";
import "./ManageQuiz.scss";
import TableQuiz from "./TableQuiz";
import ModalQuiz from "./ModalQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiService";

const ManageQuiz = () => {
  const [typeModal, setTypeModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataQuiz, setDataQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

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
      <div className="title">Manage Quizzes</div>
      <div className="py-3">
        <button
          className="btn btn-primary"
          onClick={() => handleModal("CREATE")}
        >
          Add Quiz
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
    </div>
  );
};

export default ManageQuiz;
