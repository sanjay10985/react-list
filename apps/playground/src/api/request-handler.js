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

  if (page) params.append("page", page);
  if (perPage) params.append("perPage", perPage);
  if (search) params.append("filters[search]", search);
  if (sortBy)
    params.append("sort", sortOrder === "asc" ? sortBy : `-${sortBy}`);
  // if (sortOrder) params.append("sortOrder", sortOrder);

  // Add filters as individual query params if needed
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.append(key, value);
    });
  }

  const url = `https://cms.ethiopicmary.com/${endpoint}?${params.toString()}`;

  const dataRes = await fetch(url);
  const data = await dataRes.json();

  return {
    items: data.data,
    count: data.total,
    // You might want to return the full response for additional meta data
    // meta: data.meta,
  };
};

export default requestHandler;
