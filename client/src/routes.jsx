import Layout from "./components/layout";
import Landing from "./components/landing/page";
import NotFound from "./components/notfound";

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
                path: "/:any",
                element: <NotFound />
            }
        ]
    }
];

export default routes;