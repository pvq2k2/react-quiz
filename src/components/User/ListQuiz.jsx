import React, { useEffect, useState } from "react";
import "./ListQuiz.scss";
import { getQuizByUser } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrQuiz && arrQuiz.length > 0 ? (
        arrQuiz.map((quiz, index) => {
          return (
            <div
              key={`quiz-${index}`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/jpeg;base64,${quiz.image}`}
                className="card-img-top"
                alt="imgQuiz"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                >
                  Start Now
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>You don't have any quiz now...</div>
      )}
    </div>
  );
};

export default ListQuiz;
