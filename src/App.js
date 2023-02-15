import "./App.css";
import React from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResultPage from "./components/SearchResultVideoContainer";

const AppLayout = () => {
  return (
    <Provider store={store}>
      {/* <div> */}
        <Head />
        <Body />

        {/**
         *
         *
         *
         * Head
         * Body
         *  Sidebar
         *    ItemList
         *  MainContainer
         *    ButtonList
         *    VideoContainer
         *       VideCard
         *
         *
         */}
      {/* </div> */}
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        // path: "/",
        // element: <Body />,
        // children: [
          // {
          //   path: "/",
          //   element: <MainContainer />,
          // },
          // {
          //   path: "watch",
          //   element: <WatchPage />,
          // },
          // {
          //   path: "result",
          //   element: <SearchResultPage />,
          // },
        // ],
      },
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "result",
        element: <SearchResultPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={appRouter} />;

export default App;
