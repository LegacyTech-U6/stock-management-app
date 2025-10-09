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
///////////////////////////////////
//Product Management
//////////////////////////////////
export async function getProduct() {
  const { data } = await API.get('/products')
  return data
}

export async function getOneProduct(id) {
  const { data } = await API.get(`/products/${id}`)
  return data
}

export async function updateProduct(productId, productData) {
  const { data } = await API.put(`/products/${productId}`, productData)
  return data
}

export async function deleteProduct(productId) {
  const { data } = await API.delete(`/products/${productId}`)
  return data
}

export async function createProduct(productData) {
  const { data } = await API.post('/products', productData)
  return data
}

export async function OutOfStock() {
  const { data } = await API.get('/products/out-of-stock')
  return data
}

export async function LowStock() {
  const { data } = await API.get('/products/low-stock')
  return data
}

export async function addProductStock(productId, quantityAdd) {
  const { data } = await API.post('/products/add', { productId, quantityAdd })
  return data
}

///////////////////////////////////////
// Invoice calls
///////////////////////////////////////

// ✅ Factures : Créer une facture
export async function createInvoice(invoiceData) {
  const { data } = await API.post('/factures', invoiceData)
  return data
}

// ✅ Factures : Récupérer toutes les factures
export async function getAllInvoices() {
  const { data } = await API.get('/factures')
  return data
}

// ✅ Factures : Récupérer une facture par ID avec ses lignes
export async function getInvoiceById(id) {
  const { data } = await API.get(`/factures/${id}`)
  return data
}
///////////////////////////////////////
// Sales calls
///////////////////////////////////////

// ✅ Ventes : Récupérer toutes les ventes
export async function getAllSales() {
  const { data } = await API.get('/sales')
  return data
}

// ✅ Ventes : Récupérer une vente par ID
export async function getSaleById(id) {
  const { data } = await API.get(`/sales/${id}`)
  return data
}
// ✅ Ventes : Créer une vente
export async function createSale(saleData) {
  const { data } = await API.post('/sales', saleData)
  return data
}
// ✅ Ventes : Supprimer une vente
export async function deleteSale(saleId) {
  const { data } = await API.delete(`/sales/${saleId}`)
  return data
}

/////////////////////////////////////
// category management
//////////////////////////////////////

//getting all categories
export async function getCategory() {
  const { data } = await API.get('/category')
  return data
}
// getting a paticular category
export async function getOneCategory(CategoryId) {
  const { data } = await API.get(`/category/${CategoryId}`)
  return data
}

// creating a category
export async function createCategory(categoryData) {
  const { data } = await API.post('/category', categoryData)
  return data
}

//updating category

export async function updateCategory(CategoryId, categoryData) {
  const { data } = await API.put(`/category/${CategoryId}`, categoryData)
  return data
}

//deleting a category

export async function deleteCategory(CategoryId) {
  const { data } = await API.delete(`/category/${CategoryId}`)
  return data
}
//getting products by category

export async function getProductsByCategory(categoryId) {
  const { data } = await API.get(`products/category/${categoryId}`)
  return data
}

/////////////////////////////////////////////////
//supplier  management
/////////////////////////////////////////////////

// creation of supplies
export async function createSupplier(supplierData) {
  const { data } = await API.post(`/suppliers`, supplierData)
  return data
}

/// getting all suppliers
export async function getSuppliers() {
  const { data } = await API.get('/suppliers')
  return data
}

export async function getOneSupplier(supplierId) {
  const { data } = await API.get(`/suppliers/${supplierId}`)
  return data
}

export async function updateSupplier(supplierId, supplierData) {
  const { data } = await API.put(`/suppliers/${supplierId}`, supplierData)
  return data
}

export async function deleteSupplier(supplierId) {
  const { data } = await API.delete(`/suppliers/${supplierId}`)
  return data
}


///////////////////////////////////////
// Entreprise Management
///////////////////////////////////////

// ✅ Créer une entreprise
export async function createEntreprise(entrepriseData) {
  const { data } = await API.post('/entreprises', entrepriseData)
  return data
}

// ✅ Récupérer toutes les entreprises de l'utilisateur connecté
export async function getEntreprises() {
  const { data } = await API.get('/entreprises')
  return data
}

// ✅ Récupérer une entreprise par ID
export async function getEntrepriseById(id) {
  const { data } = await API.get(`/entreprises/${id}`)
  return data
}

// ✅ Mettre à jour une entreprise
export async function updateEntreprise(id, entrepriseData) {
  const { data } = await API.put(`/entreprises/${id}`, entrepriseData)
  return data
}

// ✅ Supprimer une entreprise
export async function deleteEntreprise(id) {
  const { data } = await API.delete(`/entreprises/${id}`)
  return data
}
