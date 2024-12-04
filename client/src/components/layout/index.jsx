import { Outlet } from "react-router-dom";
import Navbar from "../landing/navbar";

const Layout = () => {
    return (
        <div>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
