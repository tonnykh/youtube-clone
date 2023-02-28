import "./App.css";
import React from "react";
import Header from "./components/Header";
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
      {/**
       *
       *
       *
       * Header
       *  SearchContainer
       *    SearchInput
       *    SuggestionsDropdown
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
      <Header />
      <Body />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    basename: "/youtube-clone",
    element: <AppLayout />,
    children: [
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
