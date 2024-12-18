module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    database: "mydb",
    dialect: "postgres",
    password: "Salam110@",
    username: "postgres",
    protocol: "postgres",
    dialectOptions: {},
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {},
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {},
  },
};
