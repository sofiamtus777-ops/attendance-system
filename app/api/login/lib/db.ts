import mysql from 'mysql2/promise'

export async function connectDB() {
  return await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', // якщо є пароль — впиши
    database: 'attendance',
    port: 3307 // ВАЖЛИВО: у тебе XAMPP працює на 3307!
  })
}