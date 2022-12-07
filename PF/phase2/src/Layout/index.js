import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/search">Search</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;