import Configs from '@/configs/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: Configs.emailUser,
    pass: Configs.emailPass,
  },
});

export default transporter;

const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: Configs.emailUser,
    to,
    subject,
    text,
  });
};

export { sendEmail };
