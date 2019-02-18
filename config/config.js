module.exports = {
  development: {
    use_env_variable: "DATABASE_URL"
  },
  test: {
    username: "quickfit_adminFinder",
    password: "HOO121p1364",
    database: "quickfit_finder",
    host: "decarie.web-dns1.com",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
}
