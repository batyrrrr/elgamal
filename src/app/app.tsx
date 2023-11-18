import { RouterProvider } from "react-router-dom"
import { router } from "./providers/router/router-config"


export const App = () => {
  return (
    <RouterProvider router={router} />

  )
}
