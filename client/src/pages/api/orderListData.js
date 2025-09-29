const BASE_URL = "https://localhost:7093/api/OrderForm";

export async function getOrders(filters = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      ...otherFilters
    } = filters;

    // Build query params (skips empty/null values)
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("pageSize", pageSize);

    for (const [key, value] of Object.entries(otherFilters)) {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    }

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    return await response.json(); // matches your PageResult<OrderListDTO>
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}