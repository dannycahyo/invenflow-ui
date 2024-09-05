import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Handle login logic here
  if (email === "test@example.com" && password === "password") {
    return { success: true };
  } else {
    return { error: "Invalid email or password" };
  }
}

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {actionData?.error && (
          <p className="text-red-500">{actionData.error}</p>
        )}
        <Form method="post" action="/login">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded"
            >
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
