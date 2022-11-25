const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Kamn@1012",
    database: "sql_demo"
})

module.exports = client
