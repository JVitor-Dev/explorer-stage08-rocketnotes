const sqlite3 = require('sqlite3') // estabelece a conexão com banco de dados
const sqlite = require('sqlite') // usado para se conectar
const path = require('path')

async function sqliteConnection() {
  const database = await sqlite.open({
    //objeto com configurações da conexão
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection
