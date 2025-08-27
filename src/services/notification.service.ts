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


const sendMail = async (user: any, resetToken: any) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.ACCOUNT_EMAIL,
            to: user.email,
            subject: "Password Reset Request",
            text: `Hello ${user.firstName},\n\nUse the following token to reset your password. It expires in 1 hour:\n\n${resetToken}\n\nIf you didn't request this, ignore this email.`,

            html: `
                <p>Hello ${user.firstName},</p>
                <p>Use the following token to reset your password. It expires in <b>1 hour</b>:</p>
                <p><b>${resetToken}</b></p>
                <p>If you didn't request this, ignore this email.</p>
                `
        });
        console.log("Message sent:", info.messageId);
    } catch (err) {
        console.error("Mail error:", err);
    }
};


export {
    sendMail
}