import React, { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleChangeFile = (e) => {};
  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <div className="add-new mt-3">
        <fieldset class="border rounded-3 p-3">
          <legend class="float-none w-auto px-3">Add new quiz</legend>
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
                class="form-control"
                id="description"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
              >
                {description}
              </textarea>
            </div>
            <div class="form-group">
              <label for="formFile" class="form-label">
                Difficulty level
              </label>
              <Select
                value={type}
                // onChange={this.handleChange}
                options={options}
              />
            </div>
            <div class="form-group">
              <label for="formFile" class="form-label">
                Upload Image
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                onChange={(e) => handleChangeFile(e)}
              />
            </div>

            {/* <div className="col-md-12">
              <label htmlFor="fileUpload" className="form-label label-upload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="fileUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="img preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div> */}
          </form>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
