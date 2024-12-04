import Layout from "./components/layout";
import Landing from "./components/landing/page";
import NotFound from "./components/notfound";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Landing />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/:any",
                element: <NotFound />
            }
        ]
    }
];

export default routes;