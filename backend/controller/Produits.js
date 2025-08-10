const {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity,
  createSale
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

  buyProduct: async (req, res) => {
    try {
        const { productId, quantitySold } = req.body;

        if (!productId || !quantitySold || quantitySold <= 0) {
            return res.status(400).json({ message: 'Invalid product ID or quantity' });
        }

        // 1. Get product
        const products = await getOneProduct(productId);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = products[0];

        // 2. Check stock
        if (product.quantity < quantitySold) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // 3. Update quantity
        const newQuantity = product.quantity - quantitySold;
        await updateProductQuantity(productId, newQuantity);

        // 4. Record sale
        const totalPrice = product.selling_price * quantitySold;
        await createSale(productId, quantitySold, totalPrice);

        // 4. Return response
        res.status(200).json({
            message: 'Purchase successful',
            product: { ...product, quantity: newQuantity },
            sale: { productId, quantitySold, totalPrice }

        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
},

  post: async (req, res) => {
    const {
      Prod_name,
      quantity,
      cost_price,
      selling_price,
      category,
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
      category,
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
      category,
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
        category,
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
};