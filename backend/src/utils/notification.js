const { getIo } = require("../config/socket"); // make sure you export io from server.js
const db = require("../config/db");
const Notification = db.Notification;
/**
 * Send a notification to all connected clients
 * and optionally save it in the DB.
 */
async function sendNotification({
  type,
  message,
  user_id = null,
  save = true,
}) {
  try {
    // 1️⃣ Save to DB (optional)
    let notificationRecord = null;
    if (save) {
      notificationRecord = await Notification.create({
        type,
        message,
        user_id,
      });
    }

    // 2️⃣ Emit via Socket.io
    getIo.emit("new-notification", {
      id: notificationRecord?.id,
      type,
      message,
      date: new Date(),
      user_id,
    });

    console.log("📣 Notification sent:", message);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}

module.exports = { sendNotification };
