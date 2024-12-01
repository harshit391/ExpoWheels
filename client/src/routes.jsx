import { Children } from "react";
import Layout from "./components/layout";
import Landing from "./components/landing/page";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Landing />
            }
        ]
    }
];

export default routes;