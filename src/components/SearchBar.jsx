import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query);
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            h-16
            pl-14
            pr-36
            rounded-2xl
            bg-white
            border
            border-gray-200
            text-gray-800
            placeholder:text-gray-400
            text-lg
            shadow-sm
            focus:outline-none
            focus:border-[#E9E7F9]
            focus:ring-4
            focus:ring-[#E9E7F9]/40
            transition-all
            duration-300
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            h-12
            px-6
            rounded-xl
            bg-[#E9E7F9]
            hover:bg-[#DDD8F6]
            text-gray-800
            font-semibold
            flex
            items-center
            gap-2
            transition-all
            duration-300
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;