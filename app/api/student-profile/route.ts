import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {

  try {

    const { userId } = await req.json()

    const [rows]: any = await db.query(
      `
      SELECT *
      FROM students
      WHERE user_id = ?
      `,
      [userId]
    )

    if (!rows.length) {

      return NextResponse.json({
        success: false
      })
    }

    return NextResponse.json({
      success: true,
      student: rows[0]
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      success: false
    })
  }
}