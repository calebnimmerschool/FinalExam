import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import EntertainersPage from "./pages/EntertainersPage";
import AddEntertainerPage from "./pages/AddEntertainer";
import EntertainerDetailsPage from "./pages/Details";

// Components
import Navbar from "./components/Navbar"; // ✅ Import the new navbar

const App: React.FC = () => {
    return (
        <Router>
            <Navbar /> {/* ✅ Add Navbar here */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/entertainers" element={<EntertainersPage />} />
                <Route path="/entertainers/add" element={<AddEntertainerPage />} />
                <Route path="/entertainers/:id" element={<EntertainerDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
