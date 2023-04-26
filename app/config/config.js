require('dotenv').config()

const mode =process.env.mode
const config =  {
  development: {
    "username": "root",
    "password": null,
    "database": "other",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false
  },
  test: {
    "username": "root",
    "password": null,
    "database": "testando",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false
  },
  production: {
    "username": "root",
    "password": null,
    "database": "other",
    "host": "localhost",
    "dialect": "mysql",
    "logging":false
  }
}

module.exports = config["test"]