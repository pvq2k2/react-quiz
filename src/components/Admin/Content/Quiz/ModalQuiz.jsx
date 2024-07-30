/* eslint-disable react-hooks/exhaustive-deps */
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
import { useTranslation } from "react-i18next";
const ModalQuiz = (props) => {
  const { show, setShow, typeModal, dataQuiz, setDataQuiz, fetchGetAllQuiz } =
    props;
  const { t } = useTranslation();
  const options = [
    { value: "EASY", label: t("modalquiz.option.easy") },
    { value: "MEDIUM", label: t("modalquiz.option.medium") },
    { value: "HARD", label: t("modalquiz.option.hard") },
  ];
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
        return { value: "EASY", label: t("modalquiz.option.easy") };
      }
      case "MEDIUM": {
        return { value: "MEDIUM", label: t("modalquiz.option.medium") };
      }
      case "HARD": {
        return { value: "HARD", label: t("modalquiz.option.hard") };
      }
      default:
        return { value: "", label: t("modalquiz.option.nodiff") };
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
              ? t("modalquiz.title.create")
              : typeModal === "UPDATE"
              ? t("modalquiz.title.update")
              : typeModal === "DELETE"
              ? t("modalquiz.title.delete")
              : t("modalquiz.title.detail")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {typeModal === "DELETE" ? (
              <>
                {t("modalquiz.body")}
                <br /> Id:
                <b> {dataQuiz && dataQuiz.id ? dataQuiz.id : ""}</b>
              </>
            ) : (
              <form className="d-flex flex-column gap-3">
                <div className="form-group">
                  <label htmlFor="quiz-name" className="form-label">
                    {t("modalquiz.input.quizname")}
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
                    {t("modalquiz.input.description")}
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
                    {t("modalquiz.input.difficultylevel")}
                  </label>
                  <Select
                    value={type}
                    onChange={setType}
                    options={options}
                    placeholder=""
                    isDisabled={typeModal === "VIEW"}
                  />
                </div>
                <div className="col-md-12">
                  <label
                    htmlFor="fileUpload"
                    className="form-label label-upload"
                  >
                    {typeModal === "VIEW" ? (
                      <>{t("modalquiz.input.previewimage")}</>
                    ) : (
                      <>
                        <FcPlus />
                        {t("modalquiz.input.file")}
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
                    <span>{t("modalquiz.input.previewimage")}</span>
                  )}
                </div>
              </form>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalquiz.btn.close")}
          </Button>
          {typeModal !== "VIEW" && (
            <Button variant="primary" onClick={() => handleSubmitQuiz()}>
              {typeModal === "CREATE"
                ? t("modalquiz.btn.create")
                : typeModal === "UPDATE"
                ? t("modalquiz.btn.update")
                : t("modalquiz.btn.confirm")}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuiz;
