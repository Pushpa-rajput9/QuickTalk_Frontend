import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Layout2 from "./Layout2.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="Register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout2 />}>
          <Route path="chat/home" element={<Home />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
