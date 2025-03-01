class Configs {
  static baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  static bcryptSaltRounds = 13;
  static emailUser = process.env.EMAIL_USER;
  static emailPass = process.env.EMAIL_PASS;
}

export default Configs;
