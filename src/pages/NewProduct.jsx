import ProductForm from "../components/ProductForm";

export async function action({ request }) {
  const formData = await request.formData();
  const newProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    category: formData.get("category"),
  };

  // Handle create logic here
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { error: "Failed to create product" };
  }
}

export default function NewProduct() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProductForm />
    </div>
  );
}
