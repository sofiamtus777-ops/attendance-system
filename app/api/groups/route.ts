import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {

  try {

    const [rows] = await db.query(
      'SELECT * FROM groups'
    )

    return NextResponse.json(rows)

  } catch (error) {

    console.log(error)

    return NextResponse.json([])
  }
}

export async function POST(req: Request) {

  try {

    const { name } = await req.json()

    await db.query(
      `
      INSERT INTO groups (name)
      VALUES (?)
      `,
      [name]
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