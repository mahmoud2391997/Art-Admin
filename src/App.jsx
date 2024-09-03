import { createBrowserRouter, RouterProvider } from "react-router-dom"
import store from "./Redux/store";
import { Provider } from "react-redux";  
//pages
import Home from "./pages/Home"
import Products from "./pages/Products"
import Users from "./pages/Users"
import Orders from "./pages/Orders"
import SingleOrder from "./pages/singleOrder/SingleOrder"
import Layout from "./component/Layout/Layout";


const router = createBrowserRouter([
  {element:<Layout/>,
  children:[
  {path: "/", element: <Home />},
  {path: "products", element: <Products />},
  {path: "users", element: <Users />},
  {path: "orders", element: <Orders />},
  {path: "orders/:id", element: <SingleOrder />},

],
},
])

export default function App() {
  return (
    <>
     <Provider store={store}> {/* لفّ التطبيق بمكون Provider وتمرير المخزن */}
      <RouterProvider router={router} />
    </Provider>
      {/* <RouterProvider  router={router}/> */}
    </>
  )
}