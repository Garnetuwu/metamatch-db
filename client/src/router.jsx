import { createBrowserRouter, Outlet, Link } from "react-router-dom";

import AuthContextProvider from "./store/auth-context";
import Login from "./routes/Login";
import Verify from "./routes/Verify";
import NewHero from "./routes/NewHero";
import Heroes from "./routes/Heroes";
import DetailedHero from "./routes/DetailedHero";
import DisplayWrapper from "./components/display/DisplayWrapper";

import { useAuth } from "./store/auth-context";
import { Provider } from "react-redux";
import { store } from "./store/heroStore";

const ContextWrapper = () => {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
};

const AuthWrapper = () => {
  const { loggedIn } = useAuth();
  return (
    <DisplayWrapper>
      {loggedIn && <Outlet />}
      {!loggedIn && (
        <div>
          <span> Unauthorized. Login first: </span>
          <Link to="/login" className="underline underline-offset-2">
            click here
          </Link>
        </div>
      )}
    </DisplayWrapper>
  );
};

const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/verify",
        element: <Verify />,
      },
      { path: "/login", element: <Login /> },
      {
        element: <AuthWrapper />,
        children: [
          {
            path: "/new-hero",
            element: (
              <Provider store={store}>
                <NewHero />
              </Provider>
            ),
          },
          {
            path: "/heroes",
            element: <Heroes />,
          },
          {
            path: "/heroes/:id",
            element: (
              <Provider store={store}>
                <DetailedHero />
              </Provider>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
