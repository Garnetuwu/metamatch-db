import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

import AuthContextProvider from "./store/auth-context";
import Login from "./routes/Login";
import Verify from "./routes/Verify";
import NewHero from "./routes/NewHero";
import DisplayWrapper from "./components/display/DisplayWrapper";
import { useAuth } from "./store/auth-context";
import Heroes from "./routes/Heroes";
import { Provider } from "react-redux";
import { store } from "./store/hero";

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
      {!loggedIn && (
        <>
          <div />
          <Outlet />
          <div />
        </>
      )}
      {loggedIn && <p> you are already logged in </p>}
    </DisplayWrapper>
  );
};

const DashboardWrapper = () => {
  const { loggedIn } = useAuth();
  return (
    <DisplayWrapper>
      {loggedIn && <Outlet />}
      {!loggedIn && <Navigate to="/login" />}
    </DisplayWrapper>
  );
};

const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        element: <AuthWrapper />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <DashboardWrapper />,
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
        ],
      },
    ],
  },
]);

export default router;
