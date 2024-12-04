import { Outlet } from "react-router-dom";
import Navbar from "../landing/navbar";

const Layout = () => {
    return (
        <div>
            <main>
                <div>
                    <Navbar />
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
