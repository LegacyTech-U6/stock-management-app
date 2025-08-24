const express = require("express")

const app = express()
const userRoutes = require("./routes/user")
const ProductRoute = require('./routes/product')
const ProductRouteStats = require('./routes/stats')
const CategoryRoute = require('./routes/category')
const SupplierRoute = require('./routes/supplier')
const OrderRoute = require('./routes/Order')
const factureRoutes = require('./routes/facture')
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

app.use('/app',userRoutes)
app.use('/api/products',ProductRoute)
app.use('/category',CategoryRoute)
app.use('/api/stats', ProductRouteStats)
app.use('/api/suppliers', SupplierRoute)
app.use('/api/orders',OrderRoute)
app.use('/api/factures', factureRoutes)

app.listen(4000,()=>{
    console.log("server started at localhost 4000")
})
