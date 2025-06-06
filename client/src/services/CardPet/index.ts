import api from "../api"

export async function getAllAppointments() {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as consultas:', error);
    return [];
  }
}