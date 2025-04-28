import ReactList, {
  ReactListEmpty,
  ReactListError,
  ReactListGoTo,
  ReactListInitialLoader,
  ReactListItems,
  ReactListLoader,
  ReactListLoadMore,
  ReactListPagination,
  ReactListPerPage,
  ReactListRefresh,
  ReactListSearch,
  ReactListSummary,
} from "@7span/react-list";
import React, { useState } from "react";

const viewOptions = [
  { value: "table", label: "Table View" },
  { value: "cards", label: "Card View" },
  { value: "simple", label: "Simple List" },
];

const loaderOptions = [
  { value: "default", label: "Default Loader" },
  { value: "custom", label: "Custom Loader" },
];

const searchOptions = [
  { value: "default", label: "Default Search" },
  { value: "custom", label: "Custom Search" },
  { value: "none", label: "No Search" },
];

const ListWrapper = () => {
  const [view, setView] = useState("table");
  const [loader, setLoader] = useState("custom");
  const [searchType, setSearchType] = useState("default");

  return (
    <div
      style={{
        maxWidth: 1200,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 16px #0001",
        padding: 32,
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 24,
          color: "#2d3748",
        }}
      >
        React List Playground
      </h2>
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        <div>
          <label style={{ fontWeight: 500 }}>View: </label>
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: "1px solid #ddd" }}
          >
            {viewOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 500 }}>Loader: </label>
          <select
            value={loader}
            onChange={(e) => setLoader(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: "1px solid #ddd" }}
          >
            {loaderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 500 }}>Search: </label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: "1px solid #ddd" }}
          >
            {searchOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ReactList
        endpoint="stories"
        search={""}
        page={1}
        perPage={10}
        filters={{}}
        sorting={{}}
        paginationMode="pagination"
      >
        {() => (
          <>
            {/* Search */}
            {searchType === "default" && <ReactListSearch />}
            {searchType === "custom" && (
              <ReactListSearch>
                {({ search, setSearch }) => (
                  <div style={{ marginBottom: 16 }}>
                    <input
                      type="text"
                      value={search}
                      onChange={setSearch}
                      placeholder="Type to search stories..."
                      style={{
                        padding: "8px 14px",
                        borderRadius: 6,
                        border: "1px solid #cbd5e1",
                        width: 300,
                        fontSize: 16,
                      }}
                    />
                  </div>
                )}
              </ReactListSearch>
            )}

            {/* Loader */}
            {loader === "default" && <ReactListInitialLoader />}
            {loader === "custom" && (
              <ReactListInitialLoader>
                {() => (
                  <div style={{ padding: 20 }}>
                    <table
                      style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        background: "#f9fafb",
                        borderRadius: 8,
                        overflow: "hidden",
                        boxShadow: "0 1px 4px #0001",
                        marginBottom: 16,
                      }}
                    >
                      <thead>
                        <tr style={{ background: "#e2e8f0" }}>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            ID
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Canonical Story ID
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Earliest Attestation
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Total Records
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Total Story Paintings
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Type of Story
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Subject
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Origin
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Title
                          </th>
                          <th
                            style={{ padding: 10, border: "1px solid #e2e8f0" }}
                          >
                            Theme ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(5)].map((_, idx) => (
                          <tr key={idx} style={{ background: "#fff" }}>
                            {Array(10)
                              .fill(0)
                              .map((_, colIdx) => (
                                <td
                                  key={colIdx}
                                  style={{
                                    padding: 8,
                                    border: "1px solid #e2e8f0",
                                    background: "#e2e8f0",
                                  }}
                                >
                                  <div
                                    style={{
                                      borderRadius: 4,
                                      margin: "0 auto",
                                      background: "#cbd5e1",
                                      animation:
                                        "pulse 1.2s infinite ease-in-out",
                                      // Skeleton shimmer effect, no fixed width/height
                                      minHeight: 16,
                                    }}
                                  />
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ textAlign: "center", padding: 20 }}>
                      <style>
                        {`
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.4; }
                100% { opacity: 1; }
              }
            `}
                      </style>
                    </div>
                  </div>
                )}
              </ReactListInitialLoader>
            )}

            <ReactListLoader>
              {() => (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(4px)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      padding: 32,
                      borderRadius: 12,
                      boxShadow: "0 2px 16px #0002",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        border: "4px solid #3182ce",
                        borderTop: "4px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        marginBottom: 16,
                      }}
                    />
                    <span
                      style={{
                        color: "#3182ce",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      Loading...
                    </span>
                    <style>
                      {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                    </style>
                  </div>
                </div>
              )}
            </ReactListLoader>

            {/* Empty State */}
            <ReactListEmpty>
              <div
                style={{ textAlign: "center", color: "#718096", padding: 32 }}
              >
                <p style={{ fontSize: 18, fontWeight: 500 }}>
                  No stories found.
                </p>
                <p>Try adjusting your filters or search.</p>
              </div>
            </ReactListEmpty>

            {/* Error State */}
            <ReactListError>
              {({ error }) => (
                <div
                  style={{
                    background: "#fed7d7",
                    color: "#c53030",
                    padding: 18,
                    borderRadius: 8,
                    margin: "16px 0",
                  }}
                >
                  <b>Failed to load data:</b> {error.message}
                </div>
              )}
            </ReactListError>

            {/* Table/Card/Simple List View */}
            <div style={{ margin: "24px 0" }}>
              <ReactListItems>
                {({ items }) => {
                  if (view === "table") {
                    return (
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          background: "#f9fafb",
                          borderRadius: 8,
                          overflow: "hidden",
                          boxShadow: "0 1px 4px #0001",
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#e2e8f0" }}>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              ID
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Canonical Story ID
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Earliest Attestation
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Total Records
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Total Story Paintings
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Type of Story
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Subject
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Origin
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Title
                            </th>
                            <th
                              style={{
                                padding: 10,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              Theme ID
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id} style={{ background: "#fff" }}>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.id}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.canonical_story_id}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.earliest_attestation}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.total_records}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.total_story_id_paintings}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.type_of_story}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.canonical_story_subject}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.origin}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.canonical_story_title}
                              </td>
                              <td
                                style={{
                                  padding: 8,
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {item.pemm_theme_id_number}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  }
                  if (view === "cards") {
                    return (
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 20 }}
                      >
                        {items.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              background: "#f1f5f9",
                              borderRadius: 8,
                              boxShadow: "0 1px 4px #0001",
                              padding: 18,
                              minWidth: 260,
                              flex: "1 1 260px",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 700,
                                color: "#2b6cb0",
                                marginBottom: 6,
                              }}
                            >
                              {item.canonical_story_title}
                            </div>
                            <div style={{ fontSize: 14, color: "#4a5568" }}>
                              <b>ID:</b> {item.id} <br />
                              <b>Type:</b> {item.type_of_story} <br />
                              <b>Subject:</b> {item.canonical_story_subject}{" "}
                              <br />
                              <b>Origin:</b> {item.origin} <br />
                              <b>Theme ID:</b> {item.pemm_theme_id_number}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  // simple list
                  return (
                    <ul style={{ padding: 0, listStyle: "none" }}>
                      {items.map((item) => (
                        <li
                          key={item.id}
                          style={{
                            background: "#f8fafc",
                            marginBottom: 10,
                            padding: 12,
                            borderRadius: 6,
                            boxShadow: "0 1px 2px #0001",
                          }}
                        >
                          <b>{item.canonical_story_title}</b> (
                          {item.type_of_story}) - {item.origin}
                        </li>
                      ))}
                    </ul>
                  );
                }}
              </ReactListItems>
            </div>

            {/* Pagination, Per Page, Summary, GoTo, LoadMore, Refresh */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
                margin: "24px 0",
              }}
            >
              <ReactListPagination />
              <ReactListPerPage
                options={[
                  { value: 10, label: "10 items" },
                  { value: 25, label: "25 items" },
                  { value: 50, label: "50 items" },
                  { value: 100, label: "Show all" },
                ]}
              />
              <ReactListGoTo />
              <ReactListSummary />
              <ReactListRefresh>
                {({ isLoading, refresh }) => (
                  <button
                    onClick={refresh}
                    disabled={isLoading}
                    style={{
                      padding: "7px 18px",
                      borderRadius: 6,
                      border: "1px solid #3182ce",
                      background: isLoading ? "#e2e8f0" : "#3182ce",
                      color: isLoading ? "#2d3748" : "#fff",
                      fontWeight: 500,
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {isLoading ? "Refreshing..." : "Refresh"}
                  </button>
                )}
              </ReactListRefresh>
            </div>
            <ReactListLoadMore>
              {({ loadMore, isLoading, hasMoreItems }) =>
                hasMoreItems && (
                  <div style={{ textAlign: "center", margin: "24px 0" }}>
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      style={{
                        padding: "10px 28px",
                        borderRadius: 6,
                        border: "none",
                        background: "#4299e1",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.7 : 1,
                        boxShadow: "0 1px 4px #0001",
                      }}
                    >
                      {isLoading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )
              }
            </ReactListLoadMore>
          </>
        )}
      </ReactList>
    </div>
  );
};

export default ListWrapper;
