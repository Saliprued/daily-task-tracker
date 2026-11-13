const API_URL = "http://127.0.0.1:8001";

export async function request(path, method = "GET", data) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    ...(data !== undefined && {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      typeof error.detail === "string"
        ? error.detail
        : "Could not complete the request.",
    );
  }

  return response.json();
}