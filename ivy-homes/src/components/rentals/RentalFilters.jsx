export default function RentalFilters({
  filters,
  onChange,
}) {
  return (
    <div className="filters">
      <input
        placeholder="Locality"
        value={filters.locality}
        onChange={(e) =>
          onChange({ locality: e.target.value })
        }
      />

      <select
        value={filters.bhk}
        onChange={(e) =>
          onChange({ bhk: e.target.value })
        }
      >
        <option value="">All BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
      </select>

      <select
        value={filters.furnishing}
        onChange={(e) =>
          onChange({ furnishing: e.target.value })
        }
      >
        <option value="">Any furnishing</option>
        <option value="fully-furnished">
          Fully furnished
        </option>
        <option value="semi-furnished">
          Semi furnished
        </option>
        <option value="unfurnished">
          Unfurnished
        </option>
      </select>
    </div>
  );
}