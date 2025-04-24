import { memo, useState, useTransition } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListSearch = memo(({ children, debounceTime = 1000 }) => {
  const { listState } = useListContext();
  const { search, setSearch } = listState;
  const [isPending, startTransition] = useTransition();
  const [localSearch, setLocalSearch] = useState(search ?? "");

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    startTransition(() => {
      setSearch(value);
    });
  };

  const searchStyles = {
    container: {
      margin: "10px 0",
      width: "100%",
      maxWidth: "300px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
    },
  };

  const scope = {
    search: localSearch,
    setSearch: handleChange,
  };

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-search" style={searchStyles.container}>
      <input
        type="text"
        value={localSearch}
        onChange={handleChange}
        placeholder="Search..."
        style={searchStyles.input}
      />
    </div>
  );
});
