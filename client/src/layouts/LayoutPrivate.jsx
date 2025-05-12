import { useState } from "react";
import { SideBar, SideBarMini } from "./SideBar";
import TopBar from "@/layouts/TopBar/TopBar";
import { Outlet } from "react-router-dom";
import { LoadingProvider } from "./LoadingProvider";

const Layout = ({ children }) => {


    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Start open

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Customize the drawer class to handle transitions
    const drawerClass = isDrawerOpen ? 'drawer-open' : '';

    return (
        <div className="flex h-screen">
            <SideBarMini isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

            <div className={`drawer ${drawerClass}`}>
                <input id="my-drawer-controller" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />


                <div className="h-full w-full drawer-content">
                    <TopBar />
                    <LoadingProvider>
                        <main><Outlet />{children}</main>
                    </LoadingProvider>
                </div>

                <SideBar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            </div>
        </div>
    )
};
export default Layout;