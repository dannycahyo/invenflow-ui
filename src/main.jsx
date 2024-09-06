import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Login, { action as loginAction } from "./pages/Login.jsx";
import Register, {
  action as registerAction,
} from "./pages/Register.jsx";
import Products, {
  loader as productsLoader,
} from "./pages/Products.jsx";
import ProductDetail, {
  loader as productDetailLoader,
  action as productDetailAction,
} from "./pages/ProductDetail.jsx";
import NewProduct, {
  action as newProductAction,
} from "./pages/NewProduct.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import RouteProtection from "./components/RouteProtection.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      // <AuthProvider>
        <Login />
      // </AuthProvider>
    ),
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/products",
    element: (
      // <AuthProvider>
        <RouteProtection>
          <DashboardLayout />
        </RouteProtection>
      // </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: ":productId",
        element: <ProductDetail />,
        loader: productDetailLoader,
        action: productDetailAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
