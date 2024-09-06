export async function fetcher(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${path}`,
    {
      ...options,
      headers,
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
