import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/auth";

export default function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const { pathname: currentPath } = useLocation();

    const activeLink = "font-bold underline text-secondary";
    const inactiveLink = "text-primary";

    const menuBar = user ? (
        <div className="flex h-auto w-full border-b justify-between text-secondary">
            <Link to="/" className="px-8 py-6 font-black">
                LOGO
            </Link>
            <nav className="self-center">
                <ul className="flex space-x-12 px-8">
                    <Link to={`/users/${user.username}`} className={activeLink}>
                        {user.username}
                    </Link>
                    <div className={inactiveLink} onClick={logout}>
                        Logout
                    </div>
                </ul>
            </nav>
        </div>
    ) : (
        <div className="flex h-auto w-full border-b justify-between text-secondary">
            <Link to="/" className="px-8 py-6 font-black">
                LOGO
            </Link>
            <nav className="self-center">
                <ul className="flex space-x-12 px-8">
                    <Link
                        to="/login"
                        className={currentPath === "/login" ? activeLink : inactiveLink}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className={currentPath === "/register" ? activeLink : inactiveLink}
                    >
                        Register
                    </Link>
                </ul>
            </nav>
        </div>
    );

    return menuBar;
}
