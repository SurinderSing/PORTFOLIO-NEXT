import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;

// await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Verify Your Email',
//     html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
//   });

const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export { sendEmail };
