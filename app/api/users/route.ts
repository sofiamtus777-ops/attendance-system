import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(req: Request) {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'attendance',
      port: 3307
    })

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

    await db.end()

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