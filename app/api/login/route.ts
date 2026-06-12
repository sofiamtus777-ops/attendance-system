import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {

    console.log('========== DB CONFIG ==========')
    console.log('HOST:', process.env.DB_HOST)
    console.log('PORT:', process.env.DB_PORT)
    console.log('USER:', process.env.DB_USER)
    console.log('DATABASE:', process.env.DB_NAME)
    console.log('================================')

    const { email, password } = await req.json()

    const [users]: any = await db.query(
      `
      SELECT *
      FROM users
      WHERE email = ?
      AND password = ?
      `,
      [email, password]
    )

    console.log('USERS FOUND:', users.length)

    if (!users.length) {
      return NextResponse.json({
        success: false
      })
    }

    const user = users[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        subject: user.subject
      }
    })

  } catch (error: any) {

    console.error('DATABASE ERROR:')
    console.error(error)

    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error'
    })
  }
}