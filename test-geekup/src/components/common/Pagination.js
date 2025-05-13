import "./Pagination.css";

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (totalPages === 1) return null;

    const pages = [...Array(totalPages)].map((_, i) => i + 1);

    return (
        <div className="pagination-container">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`pagination-button ${page === currentPage ? "active" : ""}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
