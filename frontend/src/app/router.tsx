import { createBrowserRouter, Navigate } from "react-router-dom"

import { LoginPage } from "@/pages/auth/login"
import { RegisterPage } from "@/pages/auth/register"
import ProjectDetails from "@/pages/projects/project-details"
import Project from "@/pages/projects/project"
import { AppLayout } from "@/components/layout/applayout"
import { ProtectedRoute } from "@/components/auth/protected-routes"

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
                element: <Project />,
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