import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {

  try {

    const [rows] = await db.query(
      'SELECT * FROM students'
    )

    return NextResponse.json(rows)

  } catch (error) {

    console.log(error)

    return NextResponse.json([])
  }
}

export async function POST(req: Request) {

  try {

    const { name, group_name } =
      await req.json()

    await db.query(
      `
      INSERT INTO students
      (name, group_name)
      VALUES (?, ?)
      `,
      [name, group_name]
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

export async function PUT(req: Request) {

  try {

    const {
      id,
      name,
      group_name
    } = await req.json()

    await db.query(
      `
      UPDATE students
      SET name = ?,
          group_name = ?
      WHERE id = ?
      `,
      [
        name,
        group_name,
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
      DELETE FROM students
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