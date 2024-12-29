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
import CarDetails from "./components/pages/cardetails";
import Rent from "./pages/services/rent";
import ProtectedRoute from "./utils/routeProtection/protectedRoute";
import Sell from "./pages/services/sell";
import User from "./pages/user/services";
import Bookings from "./pages/user/bookings";
import Sales from "./pages/user/sales";
import Profile from "./pages/user";

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
                        path: "/car/rent",
                        element: <Rent />,
                    },
                    {
                        path: "/car/:id",
                        element: <CarDetails />,
                    },
                    {
                        path: "/car/sell",
                        element: (
                            <ProtectedRoute>
                                <Sell />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/car/edit/:id",
                        element: (
                            <ProtectedRoute>
                                <Sell />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "/profile",
                        element: (
                            <ProtectedRoute>
                                <User />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/profile/bookings",
                        element: (
                            <ProtectedRoute>
                                <Bookings />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/profile/sales",
                        element: (
                            <ProtectedRoute>
                                <Sales />
                            </ProtectedRoute>
                        ),
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
