const {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity,
  createSale,
  getProductsByCategoryId,
  getLowStockProductsGlobal,
  checkLowStock,
  getOutOfStockProducts,
  getSales,
} = require("../models/dbConfig");
module.exports = {
  get: async (req, res, next) => {
    const products_Data = await getProduct();
    res.send(products_Data);
  },
  get2: async (req, res) => {
    const id = req.params.id;
    const product_Data = await getOneProduct(id);
    res.send(product_Data);
  },

  addProduct: async (req, res) => {
    try {
      const { productId, quantityAdd } = req.body;
      console.log(req.body);

      if (!productId || !quantityAdd || quantityAdd <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity" });
      }

      // 1.  Get product

      const products = await getOneProduct(productId);
      const product = products[0];

      // 2. updating the quantity

      const newQuantity = product.quantity + quantityAdd;
      await updateProduct(productId, newQuantity);

      //3.Return response

      res.status(200).json({
        message: "quantity added succesfully",
        product: { ...product, quantity: newQuantity },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "server error", error: error.message });
    }
  },

  buyProduct: async (req, res) => {
    try {
      const { productId, quantitySold } = req.body;

      if (!productId || !quantitySold  <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity" });
      }

      // 1. Get product
      const products = await getOneProduct(productId);
      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: "Product not found or product finished" });
      }

      const product = products[0];

      // 2. Check stock
      if (product.quantity < quantitySold) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      // 3. Update quantity
      const newQuantity = product.quantity - quantitySold;
      await updateProductQuantity(productId, newQuantity);

      // 4. Record sale
      const totalPrice = product.selling_price * quantitySold;
      await createSale(productId, quantitySold, totalPrice);
      // 5. Vérifier le seuil global
      const lowStockCheck = await checkLowStock(productId);
      if (lowStockCheck.alert) {
        console.log(
          `⚠️ ALERTE : Le produit "${lowStockCheck.product.Prod_name}" est presque en rupture (${lowStockCheck.product.quantity} restants, seuil = ${lowStockCheck.threshold})`
        );
        // Ici tu peux renvoyer aussi l'alerte dans la réponse
      }

      // 6. Return response
      res.status(200).json({
        message: "Purchase successful",
        product: { ...product, quantity: newQuantity },
        sale: { productId, quantitySold, totalPrice },
        lowStockAlert: lowStockCheck.alert,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  post: async (req, res) => {
    const {
      Prod_name,
      quantity,
      cost_price,
      selling_price,
      category_id,
      Prod_Description,
      code_bar,
      date_of_arival,
      supplier,
      prod_image,
    } = req.body;
    const product = await createProduct(
      Prod_name,
      quantity,
      cost_price,
      selling_price,
      category_id,
      Prod_Description,
      code_bar,
      date_of_arival,
      supplier,
      prod_image
    );
    res.status(201).send(product);
  },
  updated: async (req, res) => {
    const id = req.params.id;
    const {
      Prod_name,
      quantity,
      cost_price,
      selling_price,
      category_id,
      Prod_Description,
      code_bar,
      date_of_arival,
      supplier,
      prod_image,
    } = req.body;
    console.log("information received");
    console.log(req.body);
    try {
      console.log("Updating product with id:", id);
      const updatedProduct = await updateProduct(
        id,
        Prod_name,
        quantity,
        cost_price,
        selling_price,
        category_id,
        Prod_Description,
        code_bar,
        date_of_arival,
        supplier,
        prod_image
      );
      console.log(updatedProduct);

      res.status(201).send(updatedProduct);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const supprimer = await deleteProduct(id);
      res.status(200).send("Produit supprimer avec success");
    } catch (error) {
      res.status(500).send("Erreur lors de la suppression du produits");
    }
  },
  getProductsByCategory: async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const products = await getProductsByCategoryId(categoryId);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
  checkLowStockGlobal: async (req, res) => {
    console.log('Route checkLowStockGlobal appelée');
    try {
      const thresholdParam = req.query.threshold
        ? parseInt(req.query.threshold)
        : undefined;
      console.log("Threshold reçu en query:", thresholdParam);
      const { threshold, products } = await getLowStockProductsGlobal(
        thresholdParam
      );
      console.log("Produits récupérés dans le contrôleur:", products);
      if (products.length === 0) {
        return res.json({
          message: "All products have sufficient stock",
          threshold,
        });
      }
      res.json({
        message: `Some products are below the stock threshold of ${threshold}`,
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  checkOutOfStockGlobal: async (req, res) => {
  console.log('Route checkOutOfStockGlobal appelée');
  try {
    const products = await getOutOfStockProducts();

    if (products.length === 0) {
      return res.json({
        message: "All products have stock available",
        products: [],
      });
    }

    res.json({
      message: "Some products are out of stock",
      products,
    });
  } catch (error) {
    console.error('Erreur dans checkOutOfStockGlobal:', error);
    res.status(500).json({ error: error.message });
  }
},
getsales: async (req, res) => {
  try {
    const sales = await getSales();
    if (sales.length === 0) {
      return res.json({ message: "No sales data available" });
    }
    res.json({ sales });
  } catch (error) {
    console.error('Erreur dans getsales:', error);
    res.status(500).json({ error: error.message });
  }
}
};