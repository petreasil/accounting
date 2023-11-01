import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { useAppSelector } from "./hooks/hooks";
import Login from "./pages/login/Login";
import Page404 from "./pages/404/Page404";
import RequireAuth from "./components/requireauth/RequireAuth";
import MainLayout from "./components/mainlayout/MainLayout";

function App() {
  const isLogin = useAppSelector((state) => state?.auth?.isLogin);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* public routes */}
          <Route
            index
            element={
              isLogin ? (
                <Navigate replace to="/bills" />
              ) : (
                <Navigate replace to="login" />
              )
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
          {/*Private Routes*/}
          <Route element={<RequireAuth />}>
            <Route path="home/*" element={<MainLayout />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
