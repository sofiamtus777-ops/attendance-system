import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {

  try {

    const [rows] = await db.query(
      'SELECT * FROM subjects'
    )

    return NextResponse.json(rows)

  } catch (error) {

    console.log(error)

    return NextResponse.json([])
  }
}

export async function POST(
  req: Request
) {

  try {

    const { name } =
      await req.json()

    await db.query(
      `
      INSERT INTO subjects (name)
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

export async function PUT(
  req: Request
) {

  try {

    const { id, name } =
      await req.json()

    await db.query(
      `
      UPDATE subjects
      SET name = ?
      WHERE id = ?
      `,
      [name, id]
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

export async function DELETE(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url)

    const id =
      searchParams.get('id')

    await db.query(
      `
      DELETE FROM subjects
      WHERE id = ?
      `,
      [id]
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