import { useState, useCallback, ChangeEvent } from "react";

const useSearchAndPagination = () => {
  const [search, setSearch] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const handleSkip = useCallback((event: { selected: number }, limit: number) => {
    const selected = event.selected;
    const offset = Math.ceil(selected * limit);
    setSkip(offset);
  }, []);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  return {
    search,
    skip,
    handleSkip,
    handleSearch,
  };
};

export default useSearchAndPagination;
