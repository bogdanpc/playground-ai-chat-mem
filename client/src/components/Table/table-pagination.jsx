import ChevronRightIcon from "@/assets/icons/page-right.svg?react";
import ChevronLeftIcon from "@/assets/icons/page-left.svg?react";
import { useEffect, useState } from "react";

function getPaginationRange(totalPages, currentPage) {
    const totalNumbers = 5;
    const siblingCount = 1;
    const totalPageNumbers = totalNumbers + 2;

    if (totalPages <= totalPageNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftEllipsis && showRightEllipsis) {
        const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
        return [...leftRange, '...', lastPageIndex];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
        const rightRange = Array.from(
            { length: 3 + 2 * siblingCount },
            (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
        );
        return [firstPageIndex, '...', ...rightRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
        const middleRange = Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i
        );
        return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
}

export default ({ total, pageSize, onPageChange }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    useEffect(() => onPageChange(currentPage - 1), [currentPage]);
    const pagePrev = () => {
        setCurrentPage(currentPage - 1);
    }

    const pageNext = () => {
        setCurrentPage(currentPage + 1);
    }

    const pageChange = (page) => {
        setCurrentPage(page);
    }

    return (<div className="flex justify-between items-center">
        <div className="text-sm text-base-content/70">
            Showing {startIndex} to {Math.min(endIndex, total)} of {total} entries
        </div>
        <div className="join">
            <button
                className="join-item btn"
                onClick={pagePrev}
                disabled={currentPage === 0}
            >
                <ChevronLeftIcon />
            </button>
            {getPaginationRange(totalPages, currentPage).map((page, index) => (
                <button
                    key={index}
                    className={`join-item btn ${currentPage === page ? "btn-active" : ""}`}
                    onClick={() => pageChange(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button
                className="join-item btn"
                onClick={pageNext}
                disabled={currentPage === totalPages}
            >
                <ChevronRightIcon />
            </button>
        </div>
    </div>);
}