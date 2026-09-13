export default function ProjectFilters({
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
        value={filters.project_status}
        onChange={(e) =>
          onChange({
            project_status: e.target.value,
          })
        }
      >
        <option value="">All statuses</option>
        <option value="ready to move">
          Ready to move
        </option>
        <option value="under construction">
          Under construction
        </option>
      </select>
    </div>
  );
}