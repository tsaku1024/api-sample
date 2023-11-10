const { Pool } = require("pg");

const pool  = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api-test',
  password: 'postgres',
  port: '5433',
  max: 10
})

module.exports = pool;