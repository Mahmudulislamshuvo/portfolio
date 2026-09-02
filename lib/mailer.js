import nodemailer from 'nodemailer';

export const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  return transporter.sendMail(mailOptions);
};
