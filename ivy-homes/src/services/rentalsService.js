import api from "./api";

export async function getRentals({
  limit = 50,
  offset = 0,
  locality,
  bhk,
  furnishing,
  sort_by,
  order,
}) {
  const params = {
    limit,
    offset,
  };

  if (locality) params.locality = locality;
  if (bhk) params.bhk = bhk;
  if (furnishing) params.furnishing = furnishing;
  if (sort_by) params.sort_by = sort_by;
  if (order) params.order = order;

  const response = await api.get("/v1/rentals", { params });

  return response.data;
}

export async function getRental(id) {
  const response = await api.get(`/v1/rentals/${id}`);
  return response.data;
}