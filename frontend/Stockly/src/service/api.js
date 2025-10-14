import { all } from 'axios'
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
// Dans votre service API
export async function getAllInvoices() {
  const { data } = await API.get('/factures')
  console.log('📄 API Response structure:', data) // ✅ Voir la structure
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

// ✅ Récupérer une entreprise par UUID
export async function getEntrepriseById(uuid) {
  const { data } = await API.get(`/entreprises/${uuid}`)
  return data
}

// ✅ Mettre à jour une entreprise par UUID
export async function updateEntreprise(uuid, entrepriseData) {
  const { data } = await API.put(`/entreprises/${uuid}`, entrepriseData)
  return data
}

// ✅ Supprimer une entreprise par UUID
export async function deleteEntreprise(uuid) {
  const { data } = await API.delete(`/entreprises/${uuid}`)
  return data
}


/////////////////////////////////////////////////////////
// Worker management
/////////////////////////////////////////////////////////

// 🔹 Récupérer tous les workers
export async function getAllWorkers() {
  const { data } = await API.get('/workers')
  return data
}

// 🔹 Récupérer un worker par ID
export async function getWorkerById(id) {
  const { data } = await API.get(`/workers/${id}`)
  return data
}

// 🔹 Créer un nouveau worker
export async function createWorker(workerData) {
  // workerData = { email, password, position, entreprise_id, roles: [] }
  const { data } = await API.post('/workers', workerData)
  return data
}

// 🔹 Mettre à jour un worker
export async function updateWorker(id, updatedData) {
  const { data } = await API.put(`/workers/${id}`, updatedData)
  return data
}

// 🔹 Supprimer un worker
export async function deleteWorker(id) {
  const { data } = await API.delete(`/workers/${id}`)
  return data
}

////////////////////////////////////////////////////////////
// Role management
///////////////////////////////////////////////////////////////
// ✅ Récupérer tous les rôles
export async function getAllRoles() {
  const { data } = await API.get("/roles")
  return data
}

// ✅ Récupérer un rôle par ID
export async function getRoleById(id) {
  const { data } = await API.get(`/roles/${id}`)
  return data
}

// ✅ Créer un nouveau rôle
export async function createRole(roleData) {
  const { data } = await API.post("/roles", roleData)
  return data
}

// ✅ Mettre à jour un rôle
export async function updateRole(id, roleData) {
  const { data } = await API.put(`/roles/${id}`, roleData)
  return data
}

// ✅ Supprimer un rôle
export async function deleteRole(id) {
  const { data } = await API.delete(`/roles/${id}`)
  return data
}


////////////////////////////////////////////////////////////
// Statistics / Analytics API
///////////////////////////////////////////////////////////////

// ✅ Récupérer le total des ventes par produit (global) with period
export async function getProductSales(period) {
  const { data } = await API.get("/stats/product-sales", {
    params: { period }  // send period as query parameter
  });
  return data;
}


// ✅ Récupérer le rapport des ventes pour une période donnée
// period = "day" | "week" | "month"
export async function getSalesReport(period = "month") {
  const { data } = await API.get("/stats/sales-report", { params: { period } });
  return data;
}

// ✅ Récupérer le meilleur produit vendu pour une période
export async function getBestSellingProduct(period = "month") {
  const { data } = await API.get("/stats/best-selling", { params: { period } });
  return data;
}

// ✅ Récupérer la meilleure catégorie globale pour une période
export async function getBestCategory(period = "month") {
  const { data } = await API.get("/stats/best-category", { params: { period } });
  return data;
}

// ✅ Récupérer les meilleurs produits par catégorie
export async function getBestByCategory(categoryId, period = "month") {
  const { data } = await API.get(`/stats/best-by-category/${categoryId}`, { params: { period } });
  return data;
}

// ✅ Récupérer le chiffre d'affaires pour une période
// period = "day" | "month" | "year"
export async function getRevenue(period = "month") {
  const { data } = await API.get("/stats/revenue", { params: { period } });
  return data;
}

// ✅ Récupérer le profit pour une période
// period = "day" | "month"
export async function getProfit(period = "month") {
  const { data } = await API.get("/stats/profit", { params: { period } });
  return data;
}

// ✅ Comparer les ventes actuelles vs période précédente
// period = "day" | "month"
export async function compareSales(period = "month") {
  const { data } = await API.get("/stats/compare-sales", { params: { period } });
  return data;
}

// ✅ Récupérer les ventes par trimestre pour analyse saisonnière
export async function getQuarterlySales(period = "year") {
  const { data } = await API.get("/stats/quarterly-sales", { params: { period } });
  return data;
}

// ✅ Récupérer la tendance des ventes pour graphique
// period = "month" | "year"
export async function getSalesTrend(period = "month") {
  const { data } = await API.get("/stats/sales-trend", { params: { period } });
  return data;
}

// ✅ Récupérer la tendance des revenus par catégorie
// period = "month" | "year"
export async function getRevenueByCategory(period = "month") {
  const { data } = await API.get("/stats/revenue-by-category", { params: { period } });
  return data;
}

export async function getProductDistributionByCategory() {
  const response = await API.get("/stats/products/distribution-by-category")
  return response.data
}

