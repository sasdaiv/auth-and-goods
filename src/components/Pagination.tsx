import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  resultsPerPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  resultsPerPage,
  totalResults,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <MDBPaginationItem key={i} active={i === currentPage}>
          <MDBPaginationLink onClick={() => handleClick(i)}>
            {i}
          </MDBPaginationLink>
        </MDBPaginationItem>,
      );
    }

    return pageNumbers;
  };

  return (
    <MDBPagination className="mb-0">
      <MDBPaginationItem disabled={currentPage === 1}>
        <MDBPaginationLink onClick={() => handleClick(currentPage - 1)}>
          Previous
        </MDBPaginationLink>
      </MDBPaginationItem>
      {renderPageNumbers()}
      <MDBPaginationItem disabled={currentPage === totalPages}>
        <MDBPaginationLink onClick={() => handleClick(currentPage + 1)}>
          Next
        </MDBPaginationLink>
      </MDBPaginationItem>
    </MDBPagination>
  );
};

export default Pagination;
