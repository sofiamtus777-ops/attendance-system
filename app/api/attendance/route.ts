import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
      student_id,
      date,
      status,
      teacher_id
    } = body

    await db.query(

      `
      INSERT INTO attendance
      (student_id, date, status, teacher_id)

      VALUES (?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
      status = VALUES(status)
      `,
      [
        student_id,
        date,
        status,
        teacher_id
      ]
    )

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      success: false
    })
  }
}