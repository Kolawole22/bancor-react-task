import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/sign-up";
import LogIn from "./pages/log-in";
import Home from "./pages/home";
import ConfirmEmail from "./pages/confirm-email";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmail />,
  },
]);
