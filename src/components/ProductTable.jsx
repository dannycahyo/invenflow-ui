import { Link } from "react-router-dom";

export default function ProductTable({ products, onDelete }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Price</th>
          <th className="py-2 px-4 border-b">Quantity</th>
          <th className="py-2 px-4 border-b">Category</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="py-2 px-4 border-b">{product.name}</td>
            <td className="py-2 px-4 border-b">{product.price}</td>
            <td className="py-2 px-4 border-b">{product.quantity}</td>
            <td className="py-2 px-4 border-b">{product.category}</td>
            <td className="py-2 px-4 border-b">
              <Link
                to={`/products/${product._id}`}
                className="px-2 py-1 text-white bg-green-500 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(product._id)}
                className="px-2 py-1 text-white bg-red-500 rounded ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
