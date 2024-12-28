import { createBrowserRouter } from "react-router";
import SignInPage from "../pages/auth/SignIn/SignInPage";
import SignUpPage from "../pages/auth/SignUp/SignUpPage";
import WorkplacePage from "../pages/Workplace/WorkplacePage";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "../utils/protectedRoutes";
import BoardPage from "../pages/Board/BoardPage";
import AllWorkplacesPage from "../pages/AllWorkplaces/AllWorkplacesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/workplaces",
    element: (
      <ProtectedRoute>
        <AllWorkplacesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workplace/:workplaceId",
    element: (
      <ProtectedRoute>
        <WorkplacePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/board/:boardId",
    element: (
      <ProtectedRoute>
        <BoardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
