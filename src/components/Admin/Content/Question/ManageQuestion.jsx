import React, { useState } from "react";
import "./ManageQuestion.scss";
import Select from "react-select";
import { FcPlus } from "react-icons/fc";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
const ManageQuestion = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [quiz, setQuiz] = useState("");
  return (
    <div className="manage-question-container">
      <div className="title">Manage Questions</div>
      <div className="py-3">
        <div className="form-group col-6">
          <label htmlFor="formFile" className="form-label">
            Select Quiz
          </label>
          <Select value={quiz} onChange={setQuiz} options={options} />
        </div>

        <div className="question-content">
          <span className="mt-3 mb-2 d-inline-block">Add new question</span>

          <div className="question d-flex align-items-center gap-3">
            <div className="form-floating mb-3 w-50">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Description"
              />
              <label htmlFor="floatingInput">Description</label>
            </div>

            <div className="mb-3 d-flex align-items-center gap-3">
              <div className="d-flex gap-3 align-items-center">
                <div className="box-upload-file">
                  <label htmlFor="fileUpload" className="label-upload">
                    <FcPlus />
                    Upload File Image
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
                <span className="action-icon plus">
                  <BsFillPatchPlusFill />
                </span>
                <span className="action-icon minus">
                  <BsFillPatchMinusFill />
                </span>
              </div>
            </div>
          </div>
          <div className="answer d-flex align-items-center gap-2 ms-3">
            <div className="mb-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </div>
            <div className="form-floating mb-3 w-50">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Description"
              />
              <label htmlFor="floatingInput">Description</label>
            </div>

            <div className="action-answer d-flex align-items-center gap-2 mb-3 ms-2">
              <span className="action-icon plus">
                <AiFillPlusSquare />
              </span>
              <span className="action-icon minus">
                <AiFillMinusSquare />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
