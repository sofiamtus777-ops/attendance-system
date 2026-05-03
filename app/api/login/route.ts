import { NextResponse } from 'next/server'
import { connectDB } from '@/app/api/login/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const login = body.login?.trim()
    const password = body.password?.trim()

    console.log('LOGIN:', login)
    console.log('PASSWORD:', password)

    const db = await connectDB()

    console.log('DB CONNECTED')

    const [rows]: any = await db.execute(
      'SELECT * FROM users WHERE login = ? AND password = ?',
      [login, password]
    )

    console.log('ROWS:', rows)

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Невірний логін або пароль' },
        { status: 401 }
      )
    }

    const user = rows[0]

    return NextResponse.json({
      login: user.login,
      role: user.role
    })

  } catch (error) {
    console.error('SERVER ERROR:', error)

    return NextResponse.json(
      { error: 'Помилка сервера' },
      { status: 500 }
    )
  }
}