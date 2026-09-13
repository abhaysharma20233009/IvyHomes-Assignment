export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h3>{project.project_id}</h3>

      <p>{project.locality}</p>

      <p>
        ₹{project.price_min ?? "-"} - ₹
        {project.price_max ?? "-"}
      </p>

      <p>
        Units: {project.total_units ?? "-"}
      </p>

      <p>
        Available listings:{" "}
        {project.total_listings ?? "-"}
      </p>
    </article>
  );
}