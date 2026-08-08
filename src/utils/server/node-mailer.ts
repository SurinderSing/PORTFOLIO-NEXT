// Nodemailer has been deprecated in favor of Supabase Auth email verification.
export const sendEmail = async (to: string, subject: string, text: string) => {
  // eslint-disable-next-line no-console
  console.log(`[Email Mock] To: ${to}, Subject: ${subject}, Text: ${text}`);
};

const mailer = { sendEmail };
export default mailer;
