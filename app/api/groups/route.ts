import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {

    const [rows] = await db.query(
      'SELECT * FROM `groups`'
    )

    console.log('GROUPS:', rows)

    return NextResponse.json(rows)

  } catch (error) {

    console.error('GROUPS ERROR:', error)

    return NextResponse.json({
      error: String(error)
    })
  }
}