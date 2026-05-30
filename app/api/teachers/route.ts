import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {

  try {

    const [rows] = await db.query(
      'SELECT * FROM teachers'
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

    const {
      name,
      subject
    } = await req.json()

    await db.query(
      `
      INSERT INTO teachers
      (name, subject)
      VALUES (?, ?)
      `,
      [name, subject]
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

    const {
      id,
      name,
      subject
    } = await req.json()

    await db.query(
      `
      UPDATE teachers
      SET
      name = ?,
      subject = ?
      WHERE id = ?
      `,
      [
        name,
        subject,
        id
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
      DELETE FROM teachers
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