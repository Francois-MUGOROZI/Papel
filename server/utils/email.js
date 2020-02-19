import nodemailer from 'nodemailer';

const sendEmail = async options => {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
      user: '44c7f2241c61a7',
      pass: '4d791637c71763'
    }
  });
  // define email options
  const mailOptions = {
    from: 'Papel bank: <papel@gmal.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
