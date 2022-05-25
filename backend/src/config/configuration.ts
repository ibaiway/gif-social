export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    mongo: {
      user: process.env.DB_MONGO_USER,
      password: process.env.DB_MONGO_PASSWORD,
      uri: process.env.DB_MONGO_URI,
      name: process.env.DB_MONGO_NAME,
    },
  },
  cloudinary: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  authentication: {
    token: {
      secret: process.env.AUTH_TOKEN_SECRET,
      expiresIn: 600,
      audience: process.env.AUTH_TOKEN_AUDIENCE,
      issuer: process.env.AUTH_TOKEN_ISSUER,
    },
    refreshToken: {
      expiresIn: 600,
    },
  },
});
