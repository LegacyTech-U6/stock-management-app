'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1) ajouter colonne user_id à products
    await queryInterface.addColumn('Products', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // commencer nullable pour éviter blocage si pas de données utilisateur
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // 2) categories
    await queryInterface.addColumn('Categories', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // 3) clients
    await queryInterface.addColumn('Clients', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Optionnel: si vous voulez remplir user_id pour les lignes existantes
    // await queryInterface.sequelize.query("UPDATE \"Products\" SET user_id = <some_id> WHERE user_id IS NULL;");
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('Products', 'user_id');
    await queryInterface.removeColumn('Categories', 'user_id');
    await queryInterface.removeColumn('Clients', 'user_id');
  }
};
