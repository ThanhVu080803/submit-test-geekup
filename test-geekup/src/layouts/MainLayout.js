import { Link, Outlet, useLocation } from "react-router-dom";
import './MainLayout.css';

function MainLayout() {
    const location = useLocation();

    return (
        <div className="container-main">

            <aside className="sidebar">
                <img
                    src="https://geekup.vn/Icons/geekup-logo-general.svg"
                    alt="Geek Up Logo"
                    style={{ width: '150px', marginBottom: '20px' }}
                />
                <nav className="space-y-2">
                    <Link
                        to="/albums"
                        className={`${location.pathname.startsWith("/albums")
                            ? "active"
                            : ""
                            }`}
                    >
                        📁 Albums
                    </Link>
                    <Link
                        to="/users"
                        className={`${location.pathname.startsWith("/users")
                            ? "active"
                            : ""
                            }`}
                    >
                        🧑‍🤝‍🧑 Users
                    </Link>
                </nav>
            </aside>

            <main className="main-content">
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default MainLayout;
