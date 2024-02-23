import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./PaginationComponent.scss"
const PaginationComponent = (props) => {
    const { itemsPerPage, dataPage, totalPages, onChangePage } = props
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const pageCount = Math.ceil(totalPages / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % totalPages;
        onChangePage(event.selected)
        console.log(
            `User requested page number ${event.selected}`
        );
        // setItemOffset(newOffset);
    };

    console.log("PaginationComponent", { props, pageCount })
    return (
        <div
            className="pagination-component"
        >
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default PaginationComponent;
