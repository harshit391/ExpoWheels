import Layout from "./components/layout";
import Landing from "./components/landing/page";
import NotFound from "./components/notfound";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import UnProtectedRoute from "./utils/unprotectedRoute";

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
                path: "/:any",
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
