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
  const payload = {
    page,
    perPage: perPage,
    filter: {
      ...filters,
      search: search || undefined,
    },
    // sort: sortBy
    //   ? {
    //       field: sortBy,
    //       order: sortOrder,
    //     }
    //   : undefined,
    // ...meta,
  };

  const dataRes = await fetch(`https://cms.ethiopicmary.com/${endpoint}`, {
    params: payload,
  });

  const data = await dataRes.json();
  debugger;

  return {
    items: data.data,
    count: data.total,
    // You might want to return the full response for additional meta data
    // meta: data.meta,
  };
};

export default requestHandler;
