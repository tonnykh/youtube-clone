import "./App.css";
import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";

const WatchPage = lazy(() => import("./components/WatchPage"));
const SearchResultPage = lazy(() =>
  import("./components/SearchResultVideoContainer")
);

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
        element: (
          <Suspense>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "result",
        element: (
          <Suspense>
            <SearchResultPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => <RouterProvider router={appRouter} />;

export default App;
