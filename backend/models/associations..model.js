function setupAssociations(models) {
  const {
    User, Role, Permission, RolePermission,
    Entreprise, Worker, EntrepriseUser,
    Client, Category, Supplier, Product,
    Facture, FactureItem, Sale, Order,
    StockMovement, Setting, Activity
  } = models;

  // 🔗 User <-> Entreprise
  User.hasMany(Entreprise, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  Entreprise.belongsTo(User, { foreignKey: 'user_id' });

  // 🔗 Role <-> Permission
  Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' });
  Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' });

  // 🔗 Entreprise <-> Workers
  Entreprise.hasMany(Worker, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Worker.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 User <-> Worker
  User.hasMany(Worker, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  Worker.belongsTo(User, { foreignKey: 'user_id' });

  // 🔗 Entreprise <-> Category
  Entreprise.hasMany(Category, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Category.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 Entreprise <-> Product
  Entreprise.hasMany(Product, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Product.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 Product <-> Category
  Category.hasMany(Product, { foreignKey: 'category_id' });
  Product.belongsTo(Category, { foreignKey: 'category_id' });

  // 🔗 Entreprise <-> Supplier
  Entreprise.hasMany(Supplier, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Supplier.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 Product <-> Supplier
  Supplier.hasMany(Product, { foreignKey: 'supplier' });
  Product.belongsTo(Supplier, { foreignKey: 'supplier' });

  // 🔗 Entreprise <-> Client
  Entreprise.hasMany(Client, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Client.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 Entreprise <-> Facture
  Entreprise.hasMany(Facture, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Facture.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 Facture <-> Client
  Client.hasMany(Facture, { foreignKey: 'client_id' });
  Facture.belongsTo(Client, { foreignKey: 'client_id' });

  // 🔗 Facture <-> FactureItem
  Facture.hasMany(FactureItem, { foreignKey: 'facture_id', onDelete: 'CASCADE' });
  FactureItem.belongsTo(Facture, { foreignKey: 'facture_id' });

  // 🔗 Product <-> FactureItem
  Product.hasMany(FactureItem, { foreignKey: 'product_id' });
  FactureItem.belongsTo(Product, { foreignKey: 'product_id' });

  // 🔗 Entreprise <-> Settings
  Entreprise.hasOne(Setting, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Setting.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });

  // 🔗 Entreprise <-> Activity
  Entreprise.hasMany(Activity, { foreignKey: 'entreprise_id', onDelete: 'CASCADE' });
  Activity.belongsTo(Entreprise, { foreignKey: 'entreprise_id' });
}

module.exports = setupAssociations;
