import { createBrowserRouter } from "react-router-dom";
import Coin from "./screens/Coin";
import Coins from "./screens/Coins";
import Chart from "./screens/chart";
import Price from "./screens/price";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "cointracker",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "price/",
            element: <Price />,
          },
          {
            path: "chart/",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
