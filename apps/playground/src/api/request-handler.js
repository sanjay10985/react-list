const requestHandler = async ({
  endpoint,
  page,
  perPage,
  search,
  sortBy,
  sortOrder,
  filters,
  meta = {},
}) => {
  const params = new URLSearchParams();

  // Pagination
  if (page && perPage) {
    params.append("page", page);
    params.append("limit", perPage);
  }

  // Search
  if (search) {
    params.append("search", search);
  }

  // Sorting
  if (sortBy) {
    params.append("sort", sortOrder === "desc" ? `-${sortBy}` : sortBy);
  }

  // Filtering
  if (filters && Object.keys(filters).length > 0) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        // Handle different filter types
        if (typeof value === "object" && value !== null) {
          // For complex filters like _eq, _gt, _lt, etc.
          Object.entries(value).forEach(([operator, operatorValue]) => {
            params.append(`filter[${key}][${operator}]`, operatorValue);
          });
        } else {
          // Simple equality filter
          params.append(`filter[${key}][_eq]`, value);
        }
      }
    });
  }

  // Add meta query parameter to get total count
  params.append("meta", "*");

  // Build the URL with query parameters
  const queryString = params.toString();
  const url = `https://everest.7span.in/items/${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      items: data.data,
      count: data.meta?.total_count || data.meta?.filter_count || 0,
      meta: data.meta || {},
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      items: [],
      count: 0,
      error: error.message,
    };
  }
};

export default requestHandler;
