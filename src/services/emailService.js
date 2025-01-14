"use strict";
/*------------------------------------------------
|     //? Express - My Blog Api
-------------------------------------------------*/

const sendMail = require("../helpers/sendMail")

//* Welcome e-mail

const sendWelcomeEmail = async (userEmail, userName) => {
    const subject = "Welcome to Our App!";
    const text = `
    Welcome, ${userName}!
  
    Hi ${userName},
  
    Thank you for signing up for our application. We are thrilled to have you on board!
  
    Here's what you can do next:
    - Explore your dashboard.
    - Update your profile to get the most personalized experience.
    - Start enjoying our services!
  
    If you have any questions, feel free to contact our support team at support@example.com.
  
    Get Started: https://mek.com
  
    -- 2024 MeK. All rights reserved.
    `;
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color:rgb(231, 187, 187);
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color:rgb(76, 119, 175);
                color: white;
                padding: 20px;
                text-align: center;
            }
            .email-body {
                padding: 20px;
                line-height: 1.6;
            }
            .email-footer {
                background-color:rgb(76, 119, 175);
                color: #555;
                text-align: center;
                padding: 10px;
                font-size: 0.9em;
            }
            a.button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color:rgb(76, 147, 175);
                color: white;
                text-decoration: none;
                border-radius: 4px;
            }
            a.button:hover {
                background-color:rgb(42, 86, 103);
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Welcome, ${userName}!</h1>
            </div>
            <div class="email-body">
                <p>Hi ${userName},</p>
                <p>Thank you for signing up for our application. We are thrilled to have you on board!</p>
                <p>Here's what you can do next:</p>
                <ul>
                    <li>Explore your dashboard.</li>
                    <li>Update your profile to get the most personalized experience.</li>
                    <li>Start enjoying our services!</li>
                </ul>
                <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact our support team</a>.</p>
                <a class="button" href="https://mek.com">Get Started</a>
            </div>
            <div class="email-footer">
                <p>&copy; 2024 MeK. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  
    await sendMail(userEmail, subject, text, html);
  };
  
  module.exports = {
    sendWelcomeEmail,
  };