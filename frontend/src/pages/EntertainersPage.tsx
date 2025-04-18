import EntertainerList from "../components/EntertainerList";
import CategoryFilter from "../components/CategoryFilter";
import { useState } from "react";

function EntertainersPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">🎤 Browse Entertainers</h2>

            {/* Filter centered at top */}
            <div className="d-flex justify-content-center mb-4">
                <CategoryFilter 
                    selectedCategories={selectedCategories} 
                    setSelectedCategories={setSelectedCategories} 
                />
            </div>

            {/* Table centered */}
            <div className="d-flex justify-content-center">
                <div className="w-100" style={{ maxWidth: "1000px" }}>
                    <EntertainerList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    );
}

export default EntertainersPage;

