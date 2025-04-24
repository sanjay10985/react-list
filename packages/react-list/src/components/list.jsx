import { useCallback, useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useListContext } from "../context/list-provider";

const ReactList = ({
  children,
  endpoint,
  page = 1,
  perPage = 25,
  sortBy,
  sortOrder = "desc",
  search,
  filters,
  attrs,
  // requestHandler,
  version = 1,
  hasPaginationHistory = true,
  paginationMode = "pagination",
  meta = {},
  // onItemSelect,
  // onResponse,
  // afterPageChange,
  // afterLoadMore,
}) => {
  const { requestHandler, setListState } = useListContext();
  // const location = useLocation();
  // const navigate = useNavigate();
  // const queryParams = new URLSearchParams(location.search);

  // Local state management with initial values from props or URL
  const [state, setState] = useState({
    page: page,
    perPage,
    sortBy,
    sortOrder,
    search,
    filters,
    attrSettings: {},
    items: [],
    selection: [],
    error: null,
    response: null,
    count: 0,
    isLoading: false,
    initializingState: true,
  });

  const isLoadMore = paginationMode === "loadMore";

  const updateUrl = useCallback(() => {
    if (
      !isLoadMore &&
      // queryParams.get("page") !== state.page.toString() &&
      hasPaginationHistory
    ) {
      // const newParams = new URLSearchParams(location.search);
      // state.page === 1
      //   ? newParams.delete("page")
      //   : newParams.set("page", state.page);
      // navigate({ search: newParams.toString() });
    }
  }, [isLoadMore, state.page, hasPaginationHistory]);

  const getData = useCallback(
    async (addContext = {}, newState = null) => {
      if (!state.initializingState)
        setState((prev) => ({ ...prev, error: null, isLoading: true }));

      try {
        const currentState = newState || state;
        const res = await requestHandler({
          endpoint,
          version,
          meta,
          page: currentState.page,
          perPage: currentState.perPage,
          search: currentState.search,
          sortBy: currentState.sortBy,
          sortOrder: currentState.sortOrder,
          filters: currentState.filters,
          ...addContext,
        });

        setState((prev) => ({
          ...prev,
          response: res,
          selection: [],
          items: isLoadMore ? [...prev.items, ...res.items] : res.items,
          count: res.count,
          initializingState: false,
          isLoading: false,
        }));

        updateUrl();
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err,
          items: [],
          count: 0,
          initializingState: false,
          isLoading: false,
        }));
        throw err;
      }
    },
    [endpoint, version, isLoadMore, updateUrl]
  );

  // Inside handlers memo
  const handlers = useMemo(
    () => ({
      setPage: (value, addContext) => {
        const newState = { ...state, page: value };
        setState(newState);
        getData(addContext, newState);
      },
      setPerPage: (value) => {
        const newState = { ...state, perPage: value, page: 1 };
        setState(newState);
        getData({}, newState);
      },
      setSearch: (value) => {
        if (value !== state.search) {
          // Only update if value changed
          const newState = { ...state, search: value, page: 1 };
          setState(newState);
          getData({}, newState);
        }
      },
      setSort: ({ by, order }) => {
        const newState = { ...state, sortBy: by, sortOrder: order, page: 1 };
        setState(newState);
        getData({}, newState);
      },
      loadMore: () => {
        setState((prev) => ({ ...prev, page: prev.page + 1 }));
        getData();
      },
      refresh: (addContext = { isRefresh: true }) => {
        if (isLoadMore) {
          handlers.setPage(1, addContext);
        } else {
          getData(addContext);
        }
      },
      setFilters: (filters) => {
        const newState = { ...state, filters, page: 1 };
        setState(newState);
        getData({}, newState);
      },
      setSelection: (selection) => setState((prev) => ({ ...prev, selection })),
    }),
    [getData, isLoadMore]
  );

  // Memoized state for context
  const memoizedState = useMemo(
    () => ({
      data: state.items,
      response: state.response,
      error: state.error,
      count: state.count,
      selection: state.selection,
      pagination: { page: state.page, perPage: state.perPage },
      loader: {
        isLoading: state.isLoading,
        initialLoading: state.initializingState,
      },
      sort: { sortBy: state.sortBy, sortOrder: state.sortOrder },
      search: state.search,
      filters: state.filters,
      attrs: attrs || Object.keys(state.items[0] || {}),
      isEmpty: state.items.length === 0,
      ...handlers,
    }),
    [state, handlers, attrs]
  );

  useEffect(() => {
    if (!state.initializingState) {
      handlers.setPage(1);
    }
  }, [state.filters]);

  useEffect(() => {
    handlers.setPage(state.page);
  }, []);

  // Update the useEffect dependency array
  useEffect(() => {
    setListState(memoizedState);
  }, [setListState, state.items, state.count, state.error, state.isLoading]); // Only depend on essential state values

  return <div className="react-list">{children({ ...memoizedState })}</div>;
};

export default ReactList;
