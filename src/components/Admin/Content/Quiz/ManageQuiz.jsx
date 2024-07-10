import React, { useRef, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/apiService";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  let inputFile = useRef();
  const handleSubmitQuiz = async () => {
    let image = inputFile.current.files[0];
    if (!name || !description) {
      toast.error("Name or description is required !");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      inputFile.current.value = null;
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <div className="add-new mt-3">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new quiz</legend>
          <form className="d-flex flex-lg-column gap-3">
            <div className="form-group">
              <label htmlFor="quiz-name" className="form-label">
                Quiz name
              </label>
              <input
                type="text"
                className="form-control"
                id="quiz-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="formFile" className="form-label">
                Difficulty level
              </label>
              <Select value={type} onChange={setType} options={options} />
            </div>
            <div className="form-group">
              <label htmlFor="formFile" className="form-label">
                Upload Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                ref={inputFile}
              />
            </div>
          </form>
          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={() => handleSubmitQuiz()}
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
