import api from "../api"; // api é tipo thunderclient, pra testar

export async function getAppointments() { //isso roda a api nessa função
  const response = await api.get("/appointments");
  return response.data;
}