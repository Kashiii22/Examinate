const nodemailer = require("nodemailer");

module.exports.credentialsMail = (req, res) => {
    const { email, username, password,Name } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "examinate.test@gmail.com", // Your Gmail address
            pass: "tmnk cdpm dlrv cdae", // Gmail App Password (Enable 2FA and use App Password)
        },
    });

    // Mail options
    const mailOptions = {
        from: '"Examinate Support" <examinate.test@gmail.com>',
        to: email,
        subject: "Your Examinate Account Credentials",
        text: `Dear ${Name},

Welcome to Examinate, your trusted online examination platform.

Here are your login credentials:

Username: ${username}
Password: ${password}

To access your account, click the link below:
https://examinate.com/login

For security reasons, please change your password after logging in.

Best regards,
Examinate Team`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Examinate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0056b3;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            font-size: 22px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .credentials {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 16px;
            line-height: 1.5;
        }
        .credentials p {
            margin: 5px 0;
            font-weight: bold;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: #fff;
            background-color: #0056b3;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            text-align: center;
            color: #666;
        }
        .footer a {
            color: #0056b3;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Welcome to Examinate</div>
        <div class="content">
            <p>Dear <strong>${Name}</strong>,</p>
            <p>Welcome to <strong>Examinate</strong>, your trusted online examination platform.</p>
            <p>Below are your login details:</p>
            <div class="credentials">
                <p>Username: <strong>${username}</strong></p>
                <p>Password: <strong>${password}</strong></p>
            </div>
            <p>Please click the button below to access your account:</p>
            <a href="https://examinate.com/login" class="button">Login to Examinate</a>
            <p><strong>For security reasons, please change your password after logging in.</strong></p>
            <p>If you need assistance, contact our support team.</p>
        </div>
        <div class="footer">
            <p>Thank you for choosing <strong>Examinate</strong>!</p>
            <p>Need help? <a href="https://examinate.com/support">Contact Support</a></p>
        </div>
    </div>
</body>
</html>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Failed to send email", details: error.toString() });
        }
        res.json({ message: "Mail Sent Successfully"});
    });
};
