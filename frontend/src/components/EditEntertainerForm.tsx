import { useState } from "react";
import { Entertainer } from "../types/Entertainer";
import { updateEntertainer } from "../api/ProjectsAPI";

interface EditEntertainerFormProps {
    entertainer: Entertainer;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditEntertainerForm = ({ entertainer, onSuccess, onCancel }: EditEntertainerFormProps) => {
    const [formData, setFormData] = useState<Entertainer>({ ...entertainer });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateEntertainer(formData.entertainerID, formData);
        onSuccess();
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Edit Entertainer</h2>
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
                            required
                        />
                    </div>
                ))}

                <button type="submit" className="btn btn-success w-100 mb-2">Submit</button>
                <button type="button" className="btn btn-danger w-100" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditEntertainerForm;
