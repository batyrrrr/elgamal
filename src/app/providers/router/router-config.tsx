import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./router-types";
import { MainLayout } from "@/shared/layouts";
import { MainPage } from "@/pages/main-page";
import { AdminLayoutAsync } from "@/shared/layouts/admin-layout";



export const router = createBrowserRouter([
  {
    path: RoutePath.main,
    element: <MainLayout />,
    children: [
      {
        path: RoutePath.main,
        element: <MainPage />,
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: RoutePath.about,
      //       element: <AboutPage />,
      //     },
      //     {
      //       path: `${RoutePath.profile}/:id`,
      //       element: <ProfilePageAsync />,
      //     },
      //     {
      //       path: RoutePath.articles,
      //       element: <ArticlesPage />
      //     },
      //     {
      //       path: `${RoutePath.articles_details}:id`,
      //       element: <ArticlesDetailPage />,
      //     },
      //   ]
      // },

    ],
  },
  {
    path: RoutePath.admin,
    element: <AdminLayoutAsync />,
  }
  // {
  //   path: RoutePath.admin,
  //   element: <ProtectedAdminRoute />,
  //   children: [
  //     {
  //       path: RoutePath.admin,
  //       element: <AdminLayoutAsync />,
  //     }
  //   ]

  // },
  // {
  //   path: RoutePath.error,
  //   element: <NotFoundPage />,
  // },
  // {
  //   path: RoutePath.login,
  //   element: <LoginPage />
  // }
])