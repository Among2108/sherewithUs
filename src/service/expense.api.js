import { api } from "./api";

export const expenseAPI = {
  // GET /api/trips/:id/expenses
  getByTrip: async (tripId) => {
    const res = await api.get(`/api/trips/${tripId}/expenses`);
    return res.data;
  },

  // POST /api/trips/:id/expenses
  create: async (tripId, payload) => {
    const res = await api.post(`/api/trips/${tripId}/expenses`, payload);
    return res.data;
  },

  // PATCH /api/trips/:id/expenses/:expenseId
  update: async (tripId, expenseId, payload) => {
    const res = await api.patch(`/api/trips/${tripId}/expenses/${expenseId}`, payload);
    return res.data;
  },

  // DELETE /api/trips/:id/expenses/:expenseId
  remove: async (tripId, expenseId) => {
    const res = await api.delete(`/api/trips/${tripId}/expenses/${expenseId}`);
    return res.data;
  },
};
