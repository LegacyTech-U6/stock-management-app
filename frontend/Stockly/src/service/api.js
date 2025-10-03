import API from '../api/axios'
// const API_BASE_URL = "http://localhost:5000/api";
export async function CreateClient(clientData) {
  const { data } = await API.post('/client', clientData)
  return data
}
export async function getClient() {
  const { data } = await API.get('/client')
  return data
}

export async function getClientById(id) {
  const { data } = await API.get(`/client/${id}`)
  return data
}

// ✅ Clients : Mettre à jour un client
export async function updateClient(clientId, clientData) {
  const { data } = await API.put(`/client/${clientId}`, clientData)
  return data
}
// ✅ Clients : Supprimer un client
export async function deleteClient(clientId) {
  const { data } = await API.delete(`/client/${clientId}`)
  return data
}

export async function getProduct() {
  const { data } = await API.get('/products')
  return data
}

export async function getOneProduct(id) {
  const {data} = await API.get(`/products/${id}`)
  return data
}

export async function updateProduct(productId,productData) {
  const {data} = await API.put(`/products/${productId}`,productData)
  return data

}

export async function deleteProduct(productId) {
  const {data} = await API.delete(`/products/${productId}`)
  return data

}

export async function createProduct(productData) {
  const {data} = await API.post('/products',productData)
  return data

}
