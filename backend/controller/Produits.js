const {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
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

  post: async (req, res) => {
    const {
      prod_name,
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
      prod_name,
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
      prod_name,
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
        prod_name,
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