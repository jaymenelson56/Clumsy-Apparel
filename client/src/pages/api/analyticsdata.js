const BASE_URL = "https://localhost:7093/api/OrderForm";

export async function getSummary() {
  try {
    const response = await fetch(`${BASE_URL}/summary`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch summary: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
}