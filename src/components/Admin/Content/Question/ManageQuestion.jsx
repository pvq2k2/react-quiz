import "./ManageQuestion.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateQA from "./CreateQA";
import UpdateQA from "./UpdateQA";

const ManageQuestion = () => {
  return (
    <div className="manage-question-container">
      <div className="title">Manage Questions</div>
      <Tabs
        defaultActiveKey="create"
        id="justify-tab-example"
        className="my-3"
        justify
      >
        <Tab eventKey="create" title="Create">
          <CreateQA />
        </Tab>
        <Tab eventKey="update" title="Update">
          <UpdateQA />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ManageQuestion;
