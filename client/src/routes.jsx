import { Children } from "react";
import Layout from "./components/layout";
import Title from "./components/landing";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Title />
            },
            {
                path: "/test",
                element: <Title />
            }
        ]
    }
];

export default routes;