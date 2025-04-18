import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Entertainment Agency</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/entertainers">Entertainers</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
