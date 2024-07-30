import "./ManageQuestion.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateQA from "./CreateQA";
import UpdateQA from "./UpdateQA";
import { useTranslation } from "react-i18next";
const ManageQuestion = () => {
  const { t } = useTranslation();
  return (
    <div className="manage-question-container">
      <div className="title">{t("managequestion.title")}</div>
      <Tabs
        defaultActiveKey="create"
        id="justify-tab-example"
        className="my-3"
        justify
      >
        <Tab eventKey="create" title={t("managequestion.create")}>
          <CreateQA />
        </Tab>
        <Tab eventKey="update" title={t("managequestion.update")}>
          <UpdateQA />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ManageQuestion;
