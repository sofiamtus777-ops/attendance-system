import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance',
  port: 3307
})

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
      username,
      email,
      password,
      role,
      subject
    } = body

    const [result]: any = await db.execute(
      `
      INSERT INTO users
      (username, email, password, role, subject)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        username,
        email,
        password,
        role,
        subject
      ]
    )

    return NextResponse.json({
      success: true,
      userId: result.insertId
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      success: false
    })
  }
}