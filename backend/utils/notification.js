const axios = require('axios');
const nodemailer = require('nodemailer');

// --- WhatsApp ---
async function sendWhatsApp(to, message) {
    const ACCESS_TOKEN = 'TON_WHATSAPP_ACCESS_TOKEN';
    await axios.post(
        `https://graph.facebook.com/v17.0/TON_WHATSAPP_BUSINESS_ID/messages`,
        {
            messaging_product: "whatsapp",
            to: to,
            type: "text",
            text: { body: message },
        },
        { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
    );
    console.log('WhatsApp envoyé à', to);
}

// --- Email ---
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: { user: 'stockly@example.com', pass: 'motdepasse' },
});

async function sendEmail(to, subject, text) {
    await transporter.sendMail({ from: '"Stockly" <stockly@example.com>', to, subject, text });
    console.log('Email envoyé à', to);
}

module.exports = { sendWhatsApp, sendEmail };
