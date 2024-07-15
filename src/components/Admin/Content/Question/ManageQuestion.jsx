import React, { useState } from "react";
import "./ManageQuestion.scss";
import Select from "react-select";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const ManageQuestion = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    console.log(type, id);
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "question 1",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "answer 1",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((question) => question.id !== id);
      setQuestions(questionClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "answer 1",
        isCorrect: false,
      };

      const questionIndex = questionClone.findIndex(
        (question) => question.id === questionId
      );
      questionClone[questionIndex].answers.push(newAnswer);
      setQuestions(questionClone);
    }

    if (type === "REMOVE") {
      const questionIndex = questionClone.findIndex(
        (question) => question.id === questionId
      );
      questionClone[questionIndex].answers = questionClone[
        questionIndex
      ].answers.filter((answer) => answer.id !== answerId);
      setQuestions(questionClone);
    }
  };
  return (
    <div className="manage-question-container">
      <div className="title">Manage Questions</div>
      <div className="py-3">
        <div className="form-group col-6">
          <label htmlFor="formFile" className="form-label">
            Select Quiz
          </label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <span className="mt-3 mb-2 d-inline-block">Add new question</span>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="question-content mb-4">
                <div className="question d-flex align-items-center gap-3">
                  <div className="form-floating mb-3 w-50">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput-question"
                      value={question.description}
                      placeholder="Question's description"
                    />
                    <label htmlFor="floatingInput-question">
                      Question {index + 1} 's description
                    </label>
                  </div>

                  <div className="mb-3 d-flex align-items-center gap-3">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="box-upload-file">
                        <label htmlFor="fileUpload" className="label-upload">
                          <RiImageAddFill />
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          hidden
                          // onChange={(e) => handleUploadImage(e)}
                        />
                      </div>
                      <span>0 file is uploaded</span>
                    </div>

                    <div className="action-question d-flex align-items-center gap-2 mb-1 ms-2">
                      <span
                        className="action-icon plus"
                        onClick={() => handleAddRemoveQuestion("ADD", "")}
                      >
                        <BsFillPatchPlusFill />
                      </span>
                      {questions.length > 1 && (
                        <span
                          className="action-icon minus"
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        >
                          <BsFillPatchMinusFill />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div
                        key={answer.id}
                        className="answer d-flex align-items-center gap-2 ms-3"
                      >
                        <div className="mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={answer.isCorrect}
                            />
                          </div>
                        </div>
                        <div className="form-floating mb-3 w-50">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput-answer"
                            value={answer.description}
                            placeholder="Answer 1"
                          />
                          <label htmlFor="floatingInput-answer">
                            Answer {index + 1}
                          </label>
                        </div>

                        <div className="action-answer d-flex align-items-center gap-2 mb-3 ms-2">
                          <span
                            className="action-icon plus"
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "ADD",
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <AiFillPlusSquare />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              className="action-icon minus"
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiFillMinusSquare />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageQuestion;
