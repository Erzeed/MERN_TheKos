import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./page/homepage"
import { Layout } from "./utils/layout"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
