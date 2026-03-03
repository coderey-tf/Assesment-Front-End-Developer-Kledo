import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilterPage, { loader as filterLoader } from "./FilterPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
    loader: filterLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
