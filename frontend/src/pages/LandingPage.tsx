import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <div>
                <h1 className="display-3 fw-bold mb-4">🎉 Welcome to the Entertainment Agency</h1>
                <p className="lead fs-4 mb-5">
                    Browse our talented entertainers and explore their booking history!
                </p>
                <Link to="/entertainers" className="btn btn-primary btn-lg px-5 py-3 shadow">
                    View Entertainers
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
