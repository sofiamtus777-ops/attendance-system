import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {

  const { id } = await req.json()

  await db.query(
    `
    DELETE FROM students
    WHERE id = ?
    `,
    [id]
  )

  return NextResponse.json({
    success: true
  })
}