export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  clientUrl: process.env.CLIENT_URL,
  db: {
    mongo: {
      user: process.env.DB_MONGO_USER,
      password: process.env.DB_MONGO_PASSWORD,
      uri: process.env.DB_MONGO_URI,
      name: process.env.DB_MONGO_NAME,
    },
  },
  storage: {
    cloudinary: {
      name: process.env.CLOUDINARY_NAME,
      key: process.env.CLOUDINARY_KEY,
      secret: process.env.CLOUDINARY_KEY,
    },
  },
  authentication: {
    token: {
      secret: process.env.AUTH_TOKEN_SECRET,
      expiresIn: parseInt(process.env.AUTH_TOKEN_EXPIRE, 10) || 600,
      audience: process.env.AUTH_TOKEN_AUDIENCE,
      issuer: process.env.AUTH_TOKEN_ISSUER,
    },
    refreshToken: {
      expiresIn: parseInt(process.env.AUTH_REFRESHTOKEN_EXPIRE, 10) || 1200,
    },
  },
});
