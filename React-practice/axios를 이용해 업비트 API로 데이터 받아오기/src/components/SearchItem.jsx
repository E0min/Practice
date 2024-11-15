import { useState } from "react";

export default function SearchItem({ search, setSearch }) {
  const onSearch = (e) => setSearch(e.target.value);
  return (
    <div>
      <input type="text" onChange={onSearch} />
    </div>
  );
}
