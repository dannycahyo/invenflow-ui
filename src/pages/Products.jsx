import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductTable from "../components/ProductTable";
import ModalConfirmation from "../components/ModalConfirmation";
import useModal from "../hooks/useModal";
import usePagination from "../hooks/usePagination";
import { fetcher } from "../utils/fetcher";

export async function loader() {
  const products = await fetcher("/api/products");
  return { products };
}

export default function Products() {
  const { products } = useLoaderData();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { currentPage, setCurrentPage, paginatedData } =
    usePagination(products, 10);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const handleDelete = (productId) => {
    setModalMessage("Are you sure you want to delete this product?");
    setConfirmAction(() => async () => {
      await fetcher(`/api/products/${productId}`, {
        method: "DELETE",
      });
      closeModal();
      navigate("/products");
    });
    openModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Add Product
        </Link>
      </div>
      <ProductTable
        products={paginatedData}
        onDelete={handleDelete}
      />
      <div className="flex gap-4 justify-end mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={paginatedData.length < 10}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <ModalConfirmation
          message={modalMessage}
          onConfirm={confirmAction}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}
