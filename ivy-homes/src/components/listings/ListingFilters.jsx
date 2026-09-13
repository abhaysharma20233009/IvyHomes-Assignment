export default function ListingFilters({
  filters,
  onChange,
}) {
  return (
    <div className="filters">
      <input
        placeholder="Locality"
        value={filters.locality}
        onChange={(e) =>
          onChange({
            locality: e.target.value,
          })
        }
      />

      <select
        value={filters.bhk}
        onChange={(e) =>
          onChange({
            bhk: e.target.value,
          })
        }
      >
        <option value="">All BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
        <option value="4">4 BHK</option>
      </select>

      <select
        value={filters.property_type}
        onChange={(e) =>
          onChange({
            property_type: e.target.value,
          })
        }
      >
        <option value="">All property types</option>
        <option value="apartment">Apartment</option>
        <option value="builder floor">Builder Floor</option>
        <option value="independent house">
          Independent House
        </option>
        <option value="plot">Plot</option>
        <option value="villa">Villa</option>
      </select>

      <input
        type="number"
        placeholder="Minimum price"
        value={filters.min_price}
        onChange={(e) =>
          onChange({
            min_price: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Maximum price"
        value={filters.max_price}
        onChange={(e) =>
          onChange({
            max_price: e.target.value,
          })
        }
      />

      <select
        value={filters.furnishing}
        onChange={(e) =>
          onChange({
            furnishing: e.target.value,
          })
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