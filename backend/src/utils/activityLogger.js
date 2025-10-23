const db = require('../config/db');

async function logActivity({
  user_id,
  action,
  entity_type,
  entity_id = null,
  description = null,
  quantity = null,
  amount = null,
  ip_address = null,
  user_agent = null,
}) {
  try {
    await db.Activity.create({
      user_id,
      action,
      entity_type,
      entity_id,
      description,
      quantity,
      amount,
      ip_address,
      user_agent,
    });
  } catch (err) {
    console.error('Erreur lors de l’activité:', err);
  }
}

module.exports = logActivity;
