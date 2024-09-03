import { createBrowserRouter, RouterProvider } from "react-router-dom"

//pages
import Home from "./pages/Home"
import Products from "./pages/Products"
import Users from "./pages/Users"
import Orders from "./pages/Orders"
import SingleOrder from "./pages/SingleOrder"
import Login from "./pages/Login"


const router = createBrowserRouter([
  {path: "/", element: <Login />},
  {path: "home", element: <Home/>},
  {path: "products", element: <Products />},
  {path: "users", element: <Users />},
  {path: "orders", element: <Orders />},
  {path: "orders/:id", element: <SingleOrder />},
,
])

export default function App() {
  return (
    <>
      <RouterProvider  router={router}/>
    </>
  )
}
