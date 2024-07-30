import { Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import App from "./App";
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
import Loading from "./components/Loading/Loading";
import { history } from "./utils/history";
const Router = () => {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
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
          <Route
            path="/quiz/:id"
            element={
              <PrivateRoute>
                <DetailQuiz />
              </PrivateRoute>
            }
          />
        </Route>

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
    </Suspense>
  );
};

export default Router;
