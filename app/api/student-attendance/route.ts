import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {

  try {

    const { userId } = await req.json()

    const [student]: any = await db.query(
      `
      SELECT id
      FROM students
      WHERE user_id = ?
      `,
      [userId]
    )

    if (!student.length) {

      return NextResponse.json({
        success: false,
        attendance: []
      })
    }

    const studentId = student[0].id

    const [attendance]: any = await db.query(
      `
      SELECT *
      FROM attendance
      WHERE student_id = ?
      ORDER BY date DESC
      `,
      [studentId]
    )

    return NextResponse.json({
      success: true,
      attendance
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      success: false,
      attendance: []
    })
  }
}