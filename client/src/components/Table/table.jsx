import { useState, useMemo } from "react";
import TablePagination from "./table-pagination";


const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);
const Table = ({
    data = [],
    columns = [],
    onEdit,
    onDelete,
    onView,
    onPageChange,
    totalPages,
    pageSize = 10,
    searchable = true,
    className = "",
    ExtraToolBar,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter((item) =>
            columns.some((column) => {
                const value = item[column.accessor];
                return String(value ?? "")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
        );
    }, [data, searchTerm, columns]);
    


    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);


    const handleSort = (accessor) => {
        setSortConfig((prevConfig) => ({
            key: accessor,
            direction: prevConfig.key === accessor && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    const handlePageChange = (page) => {
        onPageChange && onPageChange(page);
    };

    return (
        <div className="space-y-4">

            {searchable && (
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input input-bordered w-64"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                        <button className="btn btn-square btn-neutral">
                            <SearchIcon />
                        </button>
                    </div>
                    {ExtraToolBar && <ExtraToolBar />}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className={`table table-zebra w-full ${className}`}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    onClick={() => handleSort(column.accessor)}
                                    className="cursor-pointer hover:bg-base-200"
                                >
                                    <div className="flex items-center gap-2">
                                        {column.header}
                                        {sortConfig.key === column.accessor && (
                                            <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {(onEdit || onDelete || onView) && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.length > 0 ? (
                            sortedData.map((item, index) => (
                                <tr key={item.id || index} className="hover:bg-base-200">
                                    {columns.map((column) => (
                                        <td key={column.accessor}>
                                            {column.render
                                                ? column.render(item[column.accessor], item)
                                                : item[column.accessor]}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete || onView) && (
                                        <td>
                                            <div className="flex gap-2">
                                                {onView && (
                                                    <button
                                                        className="btn btn-ghost btn-sm"
                                                        onClick={() => onView(item)}
                                                        title="Preview"
                                                    >
                                                        <EyeIcon />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        className="btn btn-ghost btn-sm"
                                                        onClick={() => onEdit(item)}
                                                        title="Edit"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        className="btn btn-ghost btn-sm text-error"
                                                        onClick={() => onDelete(item)}
                                                        title="Delete"
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TablePagination pageSize={pageSize} total={totalPages ? totalPages : sortedData.length} onPageChange={handlePageChange} />
        </div>
    );
};

export default Table;
