import { NextResponse } from 'next/server'

import db from '@/lib/db'

export async function POST(
  req: Request
){

  try{

    const {
      email,
      password
    } = await req.json()

    const [rows]: any =
      await db.execute(

        `
        SELECT * FROM users
        WHERE email = ?
        AND password = ?
        `,

        [email,password]
      )

    if(rows.length === 0){

      return NextResponse.json({

        success:false
      })
    }

    return NextResponse.json({

      success:true,

      user: rows[0]
    })

  } catch(error){

    console.log(error)

    return NextResponse.json({

      success:false
    })
  }
}