import { useLoaderData } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { fetcher } from "../utils/fetcher";
import { useActionData, Navigate } from "react-router-dom";

export async function loader({ params }) {
  const product = await fetcher(`/api/products/${params.productId}`);
  return { product };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  };

  const response = await fetcher(
    `/api/products/${params.productId}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
    },
  );

  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to update product" };
  }
}

export default function ProductDetail() {
  const { product } = useLoaderData();
  const actionData = useActionData();

  if (actionData?.error) {
    return <div className="text-red-500">{actionData.error}</div>;
  }

  if (actionData?.success) {
    return <Navigate to="/products" />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProductForm product={product} />
    </div>
  );
}
