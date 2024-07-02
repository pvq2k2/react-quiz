import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import TableUser from "./TableUser";
const ManageUser = () => {
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchGetAllUsers();
  }, []);

  const fetchGetAllUsers = async () => {
    const res = await getAllUsers();

    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
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
          <TableUser listUser={listUser} />
        </div>
        <ModalCreateUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser}
          fetchGetAllUsers={fetchGetAllUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
