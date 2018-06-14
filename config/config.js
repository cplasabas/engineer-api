module.exports = {
  port: 8010,
  db: {
    database: "engineer",
    user: "root",
    pass: "",
    options: {
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      insecureAuth: true
    }
  },
  secret: 'secrets'
}
