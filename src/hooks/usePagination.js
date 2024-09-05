import { useState } from "react";

export default function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return { currentPage, setCurrentPage, paginatedData };
}
