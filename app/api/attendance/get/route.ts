export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url)

    const teacher_id = searchParams.get('teacher_id')

    let query = 'SELECT * FROM attendance'
    let values: any[] = []

    if (teacher_id) {
      query += ' WHERE teacher_id = ?'
      values.push(teacher_id)
    }

    const [rows]: any = await db.query(query, values)

    return NextResponse.json({
      success: true,
      data: rows
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      success: false
    })
  }
}