
const getProduct = require("../models/dbConfig");
const CreateProduct = require("../models/dbConfig");
module.exports = {
  get: async (req, res) => {
    const product_Data = await getProduct();
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
    const product = await CreateProduct(
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
};
