const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.ACCOUNT_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.ACCOUNT_EMAIL,
        pass: process.env.ACCOUNT_PASSWORD,
    },
});


const sendMail = async (email: string, subject: string, body: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.ACCOUNT_EMAIL,
            to: email,
            subject,
            text: body
        });
        console.log("Message sent:", info.messageId);
    } catch (err) {
        console.error("Mail error:", err);
    }
};


export {
    sendMail
}