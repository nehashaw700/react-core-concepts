import { useState, useMemo } from "react";

const Pagination = () => {
    const data = [
        { id: 1, name: "Neha", role: "Frontend Dev" },
        { id: 2, name: "Amit", role: "Backend Dev" },
        { id: 3, name: "Riya", role: "QA Engineer" },
        { id: 4, name: "Suresh", role: "DevOps" },
        { id: 5, name: "Pooja", role: "UI Designer" },
        { id: 6, name: "Rahul", role: "Fullstack Dev" },
        { id: 7, name: "Kiran", role: "Frontend Dev" },
        { id: 8, name: "Ankit", role: "Backend Dev" },
        { id: 9, name: "Sneha", role: "Product Manager" },
        { id: 10, name: "Vikas", role: "Tech Lead" }
    ];

    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState(null);

    const sortedData = useMemo(() => {
        if (!sortConfig) return data;

        if (sortConfig?.orderBy === 'asc') {
            return data.sort((a, b) => a.id - b.id);
        } else {
            return data.sort((a, b) => b.id - a.id);
        }
    }, [data, sortConfig]);

    const getSortIcon = (type) => {
        if (sortConfig) {
            return sortConfig?.orderBy === 'asc' ? "↓" : "↑";
        }
        
        return "⇅";
    }

    const sortData = (type) => {
        if (type === "id") {
            setPage(1);
            setSortConfig((prev) => {
                return {
                    orderBy: (prev?.orderBy === 'asc') ? 'desc' : 'asc'
                }
            });
        }
    }

    const rowsPerPage = 3;
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    const startIndex = rowsPerPage * (page - 1);
    const currentData = sortedData.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div>
            <table className="emp-table">
                <thead>
                    <tr>
                        <th onClick={() => sortData("id")}>Emp Id {getSortIcon("id")}</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {currentData.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            <div className="paginated-buttons">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}> Prev </button>

                <span> Page {page} of {totalPages} </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}> Next </button>
            </div>
        </div>
    )
}

export default Pagination;