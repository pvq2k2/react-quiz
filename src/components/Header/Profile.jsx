import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";
import UserInfor from "./UserInfor";
import ChangePassword from "./ChangePassword";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;
  const { t } = useTranslation();
  const handleClose = () => setShow(false);

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
          <Modal.Title>{t("profile.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="maininfor"
            id="justify-tab-example"
            className="my-3"
            justify
          >
            <Tab eventKey="maininfor" title={t("profile.maininfor")}>
              <UserInfor />
            </Tab>
            <Tab eventKey="changepassword" title={t("profile.changepassword")}>
              <ChangePassword />
            </Tab>
            <Tab eventKey="history" title={t("profile.history")}>
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
