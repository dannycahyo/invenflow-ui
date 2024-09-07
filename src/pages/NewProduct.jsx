import { useActionData } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { fetcher } from "../utils/fetcher";
import { Navigate } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const newProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  };

  const response = await fetcher(`/api/products`, {
    method: "POST",
    body: JSON.stringify(newProduct),
  });

  if (response) {
    return { success: true };
  } else {
    return { error: "Failed to create product" };
  }
}

export default function NewProduct() {
  const actionData = useActionData();

  if (actionData?.error) {
    return <div className="text-red-500">{actionData.error}</div>;
  }

  if (actionData?.success) {
    return <Navigate to="/products" />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProductForm />
    </div>
  );
}
