import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const [filters, setFilters] = useState({
    locality: "",
    project_status: "",
    limit: 50,
    offset: 0,
  });

  function updateFilters(changes) {
    setFilters((current) => ({
      ...current,
      ...changes,
      offset: 0,
    }));
  }

  const {
    results,
    total,
    has_more,
    loading,
    error,
  } = useProjects(filters);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="page">
      <h1>Projects</h1>

      <ProjectFilters
        filters={filters}
        onChange={updateFilters}
      />

      {results.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="listing-grid">
          {results.map((project) => (
            <ProjectCard
              key={project.project_id}
              project={project}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={filters.offset === 0}
          onClick={() =>
            setFilters((current) => ({
              ...current,
              offset: Math.max(
                0,
                current.offset - current.limit
              ),
            }))
          }
        >
          Previous
        </button>

        <span>
          {filters.offset + 1}–
          {Math.min(
            filters.offset + filters.limit,
            total
          )}
        </span>

        <button
          disabled={!has_more}
          onClick={() =>
            setFilters((current) => ({
              ...current,
              offset:
                current.offset + current.limit,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}