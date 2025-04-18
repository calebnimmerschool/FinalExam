import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EntertainerInput } from "../types/Entertainer";
import { addEntertainer } from "../api/ProjectsAPI";

const AddEntertainerForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<EntertainerInput>({
        entStageName: "",
        entSSN: "",
        entStreetAddress: "",
        entCity: "",
        entState: "",
        entZipCode: "",
        entPhoneNumber: "",
        entWebPage: "",
        entEmailAddress: "",
        dateEntered: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addEntertainer(formData);
            navigate("/entertainers");
        } catch (error) {
            alert("Failed to add entertainer.");
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add New Entertainer</h2>
            <form className="card p-4 shadow" onSubmit={handleSubmit}>
                {[
                    { label: "Stage Name", name: "entStageName" },
                    { label: "SSN", name: "entSSN" },
                    { label: "Street Address", name: "entStreetAddress" },
                    { label: "City", name: "entCity" },
                    { label: "State", name: "entState" },
                    { label: "Zip Code", name: "entZipCode" },
                    { label: "Phone Number", name: "entPhoneNumber" },
                    { label: "Email Address", name: "entEmailAddress" },
                    { label: "Web Page", name: "entWebPage" },
                ].map((field) => (
                    <div className="mb-3" key={field.name}>
                        <label className="form-label">{field.label}</label>
                        <input
                            type="text"
                            className="form-control"
                            name={field.name}
                            value={(formData as any)[field.name]}
                            onChange={handleChange}
                            required={field.name === "entStageName"}
                        />
                    </div>
                ))}

                <button type="submit" className="btn btn-success w-100 mb-2">Submit</button>
                <button type="button" className="btn btn-danger w-100" onClick={() => navigate("/entertainers")}>Cancel</button>
            </form>
        </div>
    );
};

export default AddEntertainerForm;
