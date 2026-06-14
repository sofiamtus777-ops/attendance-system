import { NextResponse } from 'next/server'
import db from '@/lib/db'

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