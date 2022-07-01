"use strict";
const nodemailer = require("nodemailer");

async function sendEmail(amount, receipient) {
  try{
    let transporter = nodemailer.createTransport({
      service:'Zoho',
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "support@securetradingfx.digital",
        pass: "9LKhhKMaSarj", 
      },
    }) 
  
    let info = await transporter.sendMail({
      from: 'support@securetradingfx.digital',
      to: receipient,
      subject: "Transaction Approved",
      html: `<h3>${`
      Greetings!

      This is to inform you that your withdrawal request of $${amount} have approved and funds have been sent to your selected account
      
      
      Kind regards,
      TradecryptoFX.
      `}</h3>`,
    });
  
    console.log(info);
  }catch(err){
    console.log(err);
  }
}

module.exports = sendEmail;
