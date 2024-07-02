import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { useState } from "react";
import TableUser from "./TableUser";
const ManageUser = () => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalAddNewUser(true)}
          >
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          <TableUser />
        </div>
        <ModalCreateUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
