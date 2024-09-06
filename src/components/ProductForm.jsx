import { Form, useActionData } from "react-router-dom";

export default function ProductForm({ product = {}, onClose }) {
  const actionData = useActionData();

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">
        {product._id ? "Edit Product" : "Add Product"}
      </h2>
      {actionData?.error && (
        <p className="text-red-500">{actionData.error}</p>
      )}
      <Form
        method={product._id ? "PUT" : "POST"}
        action={
          product._id ? `/products/${product._id}` : "/products/new"
        }
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={product.price}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              defaultValue={product.quantity}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              defaultValue={product.category}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
