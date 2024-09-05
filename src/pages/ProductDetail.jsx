import { useLoaderData } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export async function loader({ params }) {
  //   const response = await fetch(`/api/products/${params.productId}`);
  //   const product = await response.json();
  console.log(params);
  return { product: {} };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  };

  // Handle update logic here
  const response = await fetch(`/api/products/${params.productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { error: "Failed to update product" };
  }
}

export default function ProductDetail() {
  const { product } = useLoaderData();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProductForm product={product} />
    </div>
  );
}
