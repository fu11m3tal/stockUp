const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 3000,
})

const get_favorites = (request, response) => {
  console.log("get favs")
  pool.query('SELECT * FROM favorites', (error, results) => {
    // if (error) {
    //   throw error
    // }
    response.send(results)
  })
}

module.exports = {
  get_favorites
}