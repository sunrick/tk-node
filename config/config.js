const fs = require('fs')

module.exports = {
  development: {
    username: null,
    password: null,
    database: "tk_dev",
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: null,
    password: null,
    database: "tk_test",
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
}
