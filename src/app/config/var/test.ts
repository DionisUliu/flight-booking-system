export default {
  port: process.env.PORT,
  appName: 'flight-system',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  apiDocsName: process.env.API_DOCS_NAME,
  apiDocsPassword: process.env.API_DOCS_PASSWORD,
  mailService: 'sendgrid',
  mailServiceApiKey: process.env.MAIL_SERVICE_API_KEY,
  mailServiceSender: process.env.MAIL_SERVICE_SENDER,
};
