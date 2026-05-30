'use client'

import { useEffect, useState } from 'react'

export default function StudentsTable() {

  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {

    try {

      const res = await fetch('/api/students')

      const data = await res.json()

      if (Array.isArray(data)) {
        setStudents(data)
      } else {
        setStudents([])
      }

    } catch (error) {

      console.log(error)

      setStudents([])
    }
  }

  return (

    <div
      style={{
        background: 'white',
        borderRadius: 20,
        padding: 20,
        marginTop: 30
      }}
    >

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}
      >

        <thead>

          <tr
            style={{
              background: '#dbeafe'
            }}
          >

            <th style={thStyle}>Студент</th>
            <th style={thStyle}>Група</th>
            <th style={thStyle}>Пропуски</th>
            <th style={thStyle}>Статус</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td style={tdStyle}>
                {student.name}
              </td>

              <td style={tdStyle}>
                {student.group_name}
              </td>

              <td style={tdStyle}>
                {student.misses || 0}
              </td>

              <td style={tdStyle}>
                {student.status || 'Навчається'}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

const thStyle = {
  padding: 15,
  textAlign: 'left' as const,
  borderBottom: '1px solid #ccc'
}

const tdStyle = {
  padding: 15,
  borderBottom: '1px solid #eee'
}