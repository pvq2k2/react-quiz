import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";

const TableUser = () => {
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
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 ? (
            listUser.map((item) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-info">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>No user</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
