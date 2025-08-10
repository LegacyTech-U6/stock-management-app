const express = require("express")

const app = express()
const userRoutes = require("./routes/user")
const ProductRoute = require('./routes/product')
const CategoryRoute = require('./routes/category')
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

app.use('/app',userRoutes)
app.use('/api/products',ProductRoute)
app.use('/category',CategoryRoute)

app.listen(4000,()=>{
    console.log("server started at localhost 4000")
})
