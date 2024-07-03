import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllUsersWithPaginate,
} from "../../../services/apiService";
// import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = () => {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [dataView, setDataView] = useState({});
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    // fetchGetAllUsers();
    fetchGetAllUsersWithPaginate(1);
  }, []);

  const fetchGetAllUsers = async () => {
    const res = await getAllUsers();

    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const fetchGetAllUsersWithPaginate = async (page) => {
    const res = await getAllUsersWithPaginate(page, LIMIT_USER);

    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataView(user);
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
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
          {/* <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchGetAllUsersWithPaginate={fetchGetAllUsersWithPaginate}
            pageCount={pageCount}
          />
        </div>
        <ModalCreateUser
          show={showModalAddNewUser}
          setShow={setShowModalAddNewUser}
          fetchGetAllUsers={fetchGetAllUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          fetchGetAllUsers={fetchGetAllUsers}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataView={dataView}
          setDataView={setDataView}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          setDataDelete={setDataDelete}
          fetchGetAllUsers={fetchGetAllUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
