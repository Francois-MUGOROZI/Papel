import nodemailer from 'nodemailer';
import keys from '../config/keys';

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: keys.FROM_EMAIL,
      pass: keys.FROM_PASSWORD
    }
  });
  // define email options
  const mailOptions = {
    from: keys.FROM_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };
  // send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
