import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-4">
          <ul>
            <li>
              <Link
                to="/products"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <nav className="mb-4">
          <ol className="flex space-x-2 text-gray-500">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>/</li>
            <li>Products</li>
          </ol>
        </nav>
        <Outlet />
      </main>
    </div>
  );
}
