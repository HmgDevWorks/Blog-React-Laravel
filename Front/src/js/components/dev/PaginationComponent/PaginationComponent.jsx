import './PaginationComponent.css';

const PaginationComponent = ({ pageCount, currentPage, handlePageChange }) => {
    return (
        <>
            {pageCount > 1 && (
                <div className="flex justify-center mt-4 pb-4">
                    <div className="join">
                        {Array.from({ length: pageCount }, (_, i) => (
                            <button
                                key={i}
                                className={`join-item btn ${currentPage === i + 1 ? 'btn-active botonActivo' : ''}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )
            }
        </>
    )
}
export default PaginationComponent;