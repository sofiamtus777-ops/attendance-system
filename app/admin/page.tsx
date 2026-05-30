'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {

  const [students, setStudents] = useState<any[]>([])

  const [groups, setGroups] = useState<any[]>([])

  const [teachers, setTeachers] = useState<any[]>([])

  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {

    loadStudents()
    loadGroups()
    loadTeachers()
    loadSubjects()

  }, [])

  async function loadStudents() {

    const res = await fetch('/api/students')

    const data = await res.json()

    setStudents(data)
  }

  async function loadGroups() {

    const res = await fetch('/api/groups')

    const data = await res.json()

    setGroups(data)
  }

  async function loadTeachers() {

    const res = await fetch('/api/teachers')

    const data = await res.json()

    setTeachers(data)
  }

  async function loadSubjects() {

    const res = await fetch('/api/subjects')

    const data = await res.json()

    setSubjects(data)
  }

  async function deleteStudent(id: number) {

    await fetch('/api/students/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })

    loadStudents()
  }

  return (

    <div style={{ padding: 40 }}>

      <h1>
        ⚙ Адмін панель
      </h1>

      <h2 style={{ marginTop: 40 }}>
        👨‍🎓 Студенти
      </h2>

      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Ім’я</th>
            <th>Група</th>
            <th>Дії</th>
          </tr>
        </thead>

        <tbody>

          {students.map((s) => (

            <tr key={s.id}>

              <td>{s.id}</td>

              <td>{s.name}</td>

              <td>{s.group_name}</td>

              <td>

                <button
                  onClick={() =>
                    deleteStudent(s.id)
                  }
                >
                  🗑 Видалити
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <h2 style={{ marginTop: 40 }}>
        👩‍🏫 Викладачі
      </h2>

      {teachers.map((t) => (

        <div key={t.id}>
          {t.name} — {t.subject}
        </div>

      ))}

      <h2 style={{ marginTop: 40 }}>
        📚 Предмети
      </h2>

      {subjects.map((s) => (

        <div key={s.id}>
          {s.name}
        </div>

      ))}

      <h2 style={{ marginTop: 40 }}>
        👥 Групи
      </h2>

      {groups.map((g) => (

        <div key={g.id}>
          {g.name}
        </div>

      ))}

    </div>
  )
}