import API from '../api/axios'

export async function getClient(){
  const { data } = await API.get("/client");
  return data;
}

export async function getClientById(id) {
  const { data } = await API.get(`/client/${id}`);
  return data;
}

// ✅ Clients : Mettre à jour un client
export async function updateClient(clientId, clientData) {
  const { data } = await API.put(`/client/${clientId}`, clientData);
  return data;
}

export async function getProduct(params) {
  const { data } = await API.get("/products", { params });
  return data;
}
