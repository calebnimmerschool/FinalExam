import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Entertainer } from "../types/Entertainer";
import { deleteEntertainer, fetchEntertainers } from "../api/ProjectsAPI";
import EditEntertainerForm from "../components/EditEntertainerForm";

const EntertainerDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const loadEntertainer = async () => {
            const data = await fetchEntertainers(100, 1, [], "asc"); // get first 100
            const found = data.entertainers.find((e) => e.entertainerID === Number(id));
            setEntertainer(found || null);
        };
        loadEntertainer();
    }, [id]);

    const handleDelete = async () => {
        if (!entertainer) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this entertainer?");
        if (confirmDelete) {
            await deleteEntertainer(entertainer.entertainerID);
            navigate("/entertainers");
        }
    };

    if (!entertainer) return <p className="text-center">Loading entertainer details...</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Entertainer Details</h2>

            {editing ? (
                <EditEntertainerForm
                    entertainer={entertainer}
                    onSuccess={() => {
                        setEditing(false);
                    }}
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <div className="card p-4 shadow">
                    <ul className="list-group list-group-flush mb-3">
                        {[
                            { label: "Stage Name", value: entertainer.entStageName },
                            { label: "SSN", value: entertainer.entSSN },
                            { label: "Street Address", value: entertainer.entStreetAddress },
                            { label: "City", value: entertainer.entCity },
                            { label: "State", value: entertainer.entState },
                            { label: "Zip Code", value: entertainer.entZipCode },
                            { label: "Phone", value: entertainer.entPhoneNumber },
                            { label: "Email", value: entertainer.entEmailAddress },
                            { label: "Web Page", value: entertainer.entWebPage },
                            { label: "Date Entered", value: entertainer.dateEntered },
                        ].map(({ label, value }) => (
                            <li key={label} className="list-group-item">
                                <strong>{label}:</strong> {value || "N/A"}
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-warning" onClick={() => setEditing(true)}>Edit</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-secondary" onClick={() => navigate("/entertainers")}>Go Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntertainerDetailsPage;
