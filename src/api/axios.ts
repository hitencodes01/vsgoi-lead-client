import axios from "axios";

export const api = axios.create({
  baseURL : "vsgoi-lead-server-production.up.railway.app/api",
  withCredentials: true,
});

export const leadStats = async () => {
  const response = await api.get("/admin/stats");
  return response.data;
};

export const groupedByDate = async ({ queryKey }: any) => {
  const [_key, month, year] = queryKey;
  const response = await api.get(`/admin/date/${month}/${year}`);
  return response.data;
};

export const fetchAllLeads = async () => {
  const response = await api.get("/lead");
  return response.data;
};

export const fetchTodayLeads = async () => {
  const response = await api.get("/lead/today");
  return response.data;
};
