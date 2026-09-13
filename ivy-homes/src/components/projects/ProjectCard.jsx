export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <h3>{project.apartment_name}</h3>

      <p>{project.locality}</p>

      <div className="project-price">
        ₹{project.price_min ?? "-"} - ₹
        {project.price_max ?? "-"}
      </div >

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