'use client'

import { useEffect, useState } from 'react'

export default function StudentPage() {

  const [attendance, setAttendance] = useState<any[]>([])

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    )

    fetch('/api/student-attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.id
      })
    })
      .then(res => res.json())
      .then(data => setAttendance(data))

  }, [])

  return (

    <div style={{ padding: '20px' }}>

      <h1>Мої пропуски</h1>

      <table border={1} cellPadding={10}>

        <thead>

          <tr>
            <th>Дата</th>
            <th>Предмет</th>
            <th>Статус</th>
          </tr>

        </thead>

        <tbody>

          {attendance.map((item) => (

            <tr key={item.id}>

              <td>{item.date}</td>

              <td>{item.subject}</td>

              <td>
                {item.status === 'absent'
                  ? '❌ Пропуск'
                  : '✅ Присутній'}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}