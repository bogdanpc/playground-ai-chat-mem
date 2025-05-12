import { Outlet } from "react-router-dom";

export default function LayoutPublic({ children }) {
    return (

        <main>
            <Outlet />{children}
        </main>
    )
}
