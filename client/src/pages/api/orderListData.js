const BASE_URL = "https://localhost:7093/api/OrderForm";

export async function getOrders(filters = {}) {
  try {
    const {
      page = 1,
      pageSize = 9,
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

export async function getOrderById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}
export async function updateOrder(id, data) {
  try {
    const formData = new FormData();

    // Only append fields that exist
    if (data.vinylType) formData.append("VinylType", data.vinylType);
    if (data.shirtType) formData.append("ShirtType", data.shirtType);
    if (data.price !== undefined) formData.append("Price", data.price);
    if (data.hoursLogged !== undefined) formData.append("HoursLogged", data.hoursLogged);
    if (data.amountOfErrors !== undefined) formData.append("AmountOfErrors", data.amountOfErrors);
    if (data.neededHelp !== undefined) formData.append("NeededHelp", data.neededHelp);
    if (data.rating !== undefined) formData.append("Rating", data.rating);
    if (data.notes) formData.append("Notes", data.notes);
    if (data.fulfilled !== undefined) formData.append("Fulfilled", data.fulfilled);
    if (data.image) formData.append("Image", data.image); // File object
    if (data.imageURL) formData.append("ImageURL", data.imageURL);

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

export async function deleteOrder(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to delete order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

export async function createOrder(data) {
  try {
    const formData = new FormData();

    // Required fields
    formData.append("VinylType", data.vinylType);
    formData.append("ShirtType", data.shirtType);
    formData.append("Price", data.price);
    formData.append("HoursLogged", data.hoursLogged);
    formData.append("AmountOfErrors", data.amountOfErrors || 0);
    formData.append("NeededHelp", data.neededHelp);
    formData.append("Rating", data.rating);
    formData.append("Fulfilled", data.fulfilled || false);

    // Optional fields
    if (data.notes) formData.append("Notes", data.notes);
    if (data.image) formData.append("Image", data.image);
    if (data.imageURL) formData.append("ImageURL", data.imageURL);

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}