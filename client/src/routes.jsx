import Layout from "./components/layout";
import Landing from "./components/landing/page";
import NotFound from "./pages/notfound";

import UnProtectedRoute from "./utils/routeProtection/unprotectedRoute";
import HighlyProtectedRoute from "./utils/routeProtection/highlyProtectedRoute";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Admin from "./pages/admin";
import Buy from "./pages/services/buy";
import Car from "./components/pages/car";
import Services from "./pages/services";

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
                path: "/car",
                element: <Services />,
                children: [
                    {
                        path: "/car/buy",
                        element: <Buy />,
                    },
                    {
                        path: "/car/:id",
                        element: <NotFound />,
                    },
                ],
            },
            {
                path: "/:any",
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
