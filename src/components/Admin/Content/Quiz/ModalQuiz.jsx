import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  deleteQuiz,
  postCreateNewQuiz,
  putUpdateQuiz,
} from "../../../../services/apiService";
import Select from "react-select";
import _ from "lodash";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ModalQuiz = (props) => {
  const { show, setShow, typeModal, dataQuiz, setDataQuiz, fetchGetAllQuiz } =
    props;

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
    setDataQuiz({});
  };

  useEffect(() => {
    if (!_.isEmpty(dataQuiz)) {
      setName(dataQuiz.name);
      setDescription(dataQuiz.description);
      setType(handleSetType(dataQuiz.difficulty));
      setImage("");
      if (dataQuiz.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataQuiz.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [dataQuiz]);

  const handleSetType = (difficulty) => {
    switch (difficulty) {
      case "EASY": {
        return { value: "EASY", label: "EASY" };
      }
      case "MEDIUM": {
        return { value: "MEDIUM", label: "MEDIUM" };
      }
      case "HARD": {
        return { value: "HARD", label: "HARD" };
      }
      default:
        return { value: "", label: "No difficulty" };
    }
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    let res;
    switch (typeModal) {
      case "CREATE": {
        if (!name || !description) {
          toast.error("Name or description is required !");
          return;
        }
        res = await postCreateNewQuiz(description, name, type?.value, image);
        break;
      }
      case "UPDATE": {
        if (!name || !description) {
          toast.error("Name or description is required !");
          return;
        }
        res = await putUpdateQuiz(
          dataQuiz.id,
          description,
          name,
          type?.value,
          image
        );
        break;
      }
      case "DELETE": {
        res = await deleteQuiz(dataQuiz.id);
        break;
      }
      default:
        break;
    }

    if (res && res.EC === 0) {
      toast.success(res.EM);
      await fetchGetAllQuiz();
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
          <Modal.Title>
            {typeModal === "CREATE"
              ? "Create Quiz"
              : typeModal === "UPDATE"
              ? "Update Quiz"
              : typeModal === "DELETE"
              ? "Delete Quiz"
              : "Detail Quiz"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {typeModal === "DELETE" ? (
              <>
                Are you sure delete this quiz ?
                <br /> Id:
                <b> {dataQuiz && dataQuiz.id ? dataQuiz.id : ""}</b>
              </>
            ) : (
              <form className="d-flex flex-column gap-3">
                <div className="form-group">
                  <label htmlFor="quiz-name" className="form-label">
                    Quiz name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quiz-name"
                    value={name}
                    disabled={typeModal === "VIEW"}
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
                    disabled={typeModal === "VIEW"}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formFile" className="form-label">
                    Difficulty level
                  </label>
                  <Select
                    value={type}
                    onChange={setType}
                    options={options}
                    isDisabled={typeModal === "VIEW"}
                  />
                </div>
                <div className="col-md-12">
                  <label
                    htmlFor="fileUpload"
                    className="form-label label-upload"
                  >
                    {typeModal === "VIEW" ? (
                      <>Preview Image</>
                    ) : (
                      <>
                        <FcPlus />
                        Upload File Image
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    hidden
                    disabled={typeModal === "VIEW"}
                    onChange={(e) => handleUploadImage(e)}
                  />
                </div>

                <div className="col-md-12 img-preview">
                  {previewImage ? (
                    <img src={previewImage} alt="img preview" />
                  ) : (
                    <span>Preview Image</span>
                  )}
                </div>
              </form>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {typeModal !== "VIEW" && (
            <Button variant="primary" onClick={() => handleSubmitQuiz()}>
              {typeModal === "CREATE"
                ? "Save Changes"
                : typeModal === "UPDATE"
                ? "Update"
                : "Confirm"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuiz;
