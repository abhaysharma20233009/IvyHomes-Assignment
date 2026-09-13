import api from "./api";

export async function getProjects({
  limit = 50,
  offset = 0,
  locality,
  project_status,
  sort_by,
  order,
}) {
  const params = {
    limit,
    offset,
  };

  if (locality) params.locality = locality;
  if (project_status) params.project_status = project_status;
  if (sort_by) params.sort_by = sort_by;
  if (order) params.order = order;

  const response = await api.get("/v1/projects", { params });

  return response.data;
}