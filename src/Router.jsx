import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import Dashboard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login";
import LayoutAuth from "./components/Auth/LayoutAuth";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>
        <Route
          path="/login"
          element={
            <LayoutAuth>
              <Login />
            </LayoutAuth>
          }
        />
        <Route
          path="/register"
          element={
            <LayoutAuth>
              <Register />
            </LayoutAuth>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
