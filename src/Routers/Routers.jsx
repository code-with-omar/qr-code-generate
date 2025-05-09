import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Qr from "../Qr";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "qr/:id",
    element: <Qr />,
    loader: ({ params }) =>
      fetch(`https://qr-code-indol-delta.vercel.app/qr?id=${params.id}`),
  },
]);
