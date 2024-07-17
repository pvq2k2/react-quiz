import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
const CreateQA = () => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [questions, setQuestions] = useState(initQuestion);

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchGetAllQuiz();
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

  const handleAddRemoveQuestion = (type, id) => {
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
        description: "",
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

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      const questionIndex = questionClone.findIndex(
        (question) => question.id === questionId
      );
      if (questionIndex > -1) {
        questionClone[questionIndex].description = value;
        setQuestions(questionClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    const questionIndex = questionClone.findIndex(
      (question) => question.id === questionId
    );
    if (questionIndex > -1 && event.target.files && event.target.files[0]) {
      questionClone[questionIndex].imageFile = event.target.files[0];
      questionClone[questionIndex].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    const questionIndex = questionClone.findIndex(
      (question) => question.id === questionId
    );
    if (questionIndex > -1) {
      questionClone[questionIndex].answers = questionClone[
        questionIndex
      ].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(questionClone);
    }
  };

  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    const questionIndex = questionClone.findIndex(
      (question) => question.id === questionId
    );
    if (questionIndex > -1) {
      setDataImagePreview({
        title: questionClone[questionIndex].imageName,
        url: URL.createObjectURL(questionClone[questionIndex].imageFile),
      });
      setIsPreviewImage(true);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    //validate answer
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }

    if (isValidAnswer === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    //validate question
    let isValidQuestion = true;
    let indexValidQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexValidQ = i;
        break;
      }
    }

    if (isValidQuestion === false) {
      toast.error(`Not empty description for Question ${indexValidQ + 1}`);
      return;
    }

    for (const question of questions) {
      const resQ = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          resQ.DT.id
        );
      }
    }

    toast.success("Create question and answer succsed !");
    setQuestions(initQuestion);
  };
  return (
    <>
      <div className="py-3">
        <div className="form-group col-6">
          <label htmlFor="formFile" className="form-label">
            Select Quiz
          </label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                      placeholder="Question's description"
                    />
                    <label htmlFor="floatingInput-question">
                      Question {index + 1} 's description
                    </label>
                  </div>

                  <div className="mb-3 d-flex align-items-center gap-3">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="box-upload-file">
                        <label
                          htmlFor={`${question.id}`}
                          className="label-upload"
                        >
                          <RiImageAddFill />
                        </label>
                        <input
                          type="file"
                          id={`${question.id}`}
                          hidden
                          onChange={(e) =>
                            handleOnChangeFileQuestion(question.id, e)
                          }
                        />
                      </div>
                      <span>
                        {question.imageName ? (
                          <span
                            className="label-image"
                            onClick={() => handlePreviewImage(question.id)}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          "0 file is uploaded"
                        )}
                      </span>
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
                              onChange={(event) =>
                                handleAnswerQuestion(
                                  "CHECKBOX",
                                  answer.id,
                                  question.id,
                                  event.target.checked
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="form-floating mb-3 w-50">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput-answer"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          />
        )}
      </div>
    </>
  );
};

export default CreateQA;
