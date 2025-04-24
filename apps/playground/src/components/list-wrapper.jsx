import ReactList, {
  ReactListEmpty,
  ReactListError,
  ReactListGoTo,
  ReactListInitialLoader,
  ReactListItems,
  ReactListLoader,
  ReactListPagination,
  ReactListPerPage,
  ReactListSearch,
  ReactListSummary,
} from "@7span/react-list";
import React from "react";

const ListWrapper = () => {
  return (
    <div>
      <ReactList
        endpoint="stories"
        search={""}
        page={1}
        perPage={10}
        filters={{}}
        sorting={{}}
        paginationMode="pagination"
      >
        {({ data, pagination, refresh, filters, setFilters, setSearch }) => {
          debugger;
          return (
            <>
              <ReactListSearch />
              <ReactListInitialLoader />
              <ReactListLoader />
              <ReactListEmpty />
              <ReactListError />
              <ReactListItems />
              {/* <ReactListLoadMore /> */}
              <ReactListSummary />
              <ReactListGoTo />
              <ReactListPerPage />
              <ReactListPagination />
            </>
          );
        }}
      </ReactList>
    </div>
  );
};

export default ListWrapper;
