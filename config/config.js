require('dotenv').config();

const URI = process.env.DB_URL;

const dbConfig = {
  url: URI,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  development: { ...dbConfig },
  test: { ...dbConfig },
  production: { ...dbConfig },
};
