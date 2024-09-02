import { createBrowserRouter, RouterProvider } from "react-router-dom"

//pages
import Home from "./pages/Home"
import Products from "./pages/Products"
import Users from "./pages/Users"
import Orders from "./pages/Orders"
import SingleOrder from "./pages/SingleOrder"
import SingleProduct from "./pages/SingleProduct"


const router = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "products", element: <Products />},
  {path: "products/:productId", element: <SingleProduct />},
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
