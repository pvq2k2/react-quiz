import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
const ModalResult = (props) => {
  const { show, setShow, dataModalResult, handleShowAnswer } = props;

  const handleClose = () => setShow(false);
  const { t } = useTranslation();
  return (
    <>
      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("modalresult.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("modalresult.totalquestion")} <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {t("modalresult.totalcorrectanswers")}{" "}
            <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modalresult.btn.close")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowAnswer();
            }}
          >
            {t("modalresult.btn.showanswer")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
