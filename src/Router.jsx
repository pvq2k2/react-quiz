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
import NotFound from "./components/NotFound/NotFound";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import ManageQuestion from "./components/Admin/Content/Question/ManageQuestion";
import PrivateRoute from "./components/Route/PrivateRoute";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/quiz/:id"
          element={
            <PrivateRoute>
              <DetailQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<ManageQuestion />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
