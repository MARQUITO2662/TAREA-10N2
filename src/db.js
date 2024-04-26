import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config()

// Configuración de la conexión a la base de datos
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Seleccionar la base de datos
await connection.query(`USE ${process.env.DB_NAME}`)

export default connection
