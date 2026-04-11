import { createBrowserRouter, Navigate } from "react-router-dom"

import { LoginPage } from "@/pages/auth/login"
import { RegisterPage } from "@/pages/auth/register"
import ProjectDetails from "@/pages/projects/project-details"
import { AppLayout } from "@/components/layout/applayout"
import { ProtectedRoute } from "@/components/auth/protected-routes"
import ProjectPage from "@/pages/projects/project"

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/projects" />,
          },
          {
            path: "projects",
            children: [
              {
                index: true,
                element: <ProjectPage />,
              },
              {
                path: ":id",
                element: <ProjectDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
])

export default router