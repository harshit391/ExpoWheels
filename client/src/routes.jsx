import Layout from "./components/layout";
import Landing from "./components/landing/page";
import NotFound from "./components/notfound";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import UnProtectedRoute from "./utils/routeProtection/unprotectedRoute";
import HighlyProtectedRoute from "./utils/routeProtection/highlyProtectedRoute";
import Admin from "./pages/admin";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/login",
                element: (
                    <UnProtectedRoute>
                        <Login />
                    </UnProtectedRoute>
                ),
            },
            {
                path: "/register",
                element: (
                    <UnProtectedRoute>
                        <Register />
                    </UnProtectedRoute>
                ),
            },
            {
                path: "/admin",
                element: (
                    <HighlyProtectedRoute>
                        <Admin />
                    </HighlyProtectedRoute>
                ),
            },
            {
                path: "/:any",
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
