import { useEffect, useState } from "react";
import { Entertainer } from "../types/Entertainer";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { fetchEntertainers } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

function EntertainerList({ selectedCategories }: { selectedCategories: string[] }) {
    const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchEntertainers(pageSize, pageNum, selectedCategories, sortOrder);
                setEntertainers(data.entertainers);
                setTotalPages(Math.max(1, Math.ceil(data.totalNumEntertainers / pageSize)));
            } catch (error) {
                console.error("Error fetching entertainers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageSize, pageNum, selectedCategories, sortOrder]);

    const triggerConfetti = () => {
        confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.5 } });
    };

    if (loading) return <p className="text-center fs-5">Loading entertainers...</p>;

    return (
        <div id="bookCard" className="container mt-4">
            <h2 className="text-center mb-4">Entertainer List</h2>

            {/* Top button bar for sorting */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-primary"
                    style={{ transition: "background-color 0.3s ease" }}
                    onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        triggerConfetti();
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff5733'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                    Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
                </button>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow">
                    <thead className="table-primary">
                        <tr>
                            <th>Stage Name</th>
                            <th>Bookings</th>
                            <th>Last Booked</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {entertainers.map((ent) => (
                            <tr key={ent.entertainerID}>
                                <td>{ent.entStageName}</td>
                                <td>{ent.bookingCount ?? 0}</td>
                                <td>{ent.lastBookingDate ?? "N/A"}</td>
                                <td>
                                    <button className="btn btn-outline-primary" onClick={() => navigate(`/entertainers/${ent.entertainerID}`)}>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />

            {/* ✅ Bottom Add Button */}
                <div className="text-center mt-4">
                    <button 
                        className="btn btn-success btn-lg px-4 shadow"
                        onClick={() => navigate("/entertainers/add")}
                    >
                        + Add Entertainer
                    </button>
                </div>

        </div>
    );
}

export default EntertainerList;

