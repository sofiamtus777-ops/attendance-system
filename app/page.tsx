'use client'

import { useEffect, useState } from 'react'

import LoginForm from './components/LoginForm'
import AddStudentForm from './components/AddStudentForm'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

export default function Home() {

  const [user, setUser] =
    useState<any>(null)

  const [students, setStudents] =
    useState<any[]>([])

  const [attendance, setAttendance] =
    useState<any>({})

  const [groups, setGroups] =
    useState<any[]>([])

  const [subjects, setSubjects] =
    useState<any[]>([])

  const [teachers, setTeachers] =
    useState<any[]>([])

  const [newSubject, setNewSubject] =
    useState('')

  const [newTeacher, setNewTeacher] =
    useState('')

    const [teacherEmail, setTeacherEmail] =
  useState('')

const [teacherPassword, setTeacherPassword] =
  useState('')

  const [teacherSubject,
    setTeacherSubject] =
    useState('')

  const [activeGroup, setActiveGroup] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [day, setDay] =
    useState(1)

  const [month, setMonth] =
    useState('Вересень')

  const months = [
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень'
  ]

  useEffect(() => {

    const savedUser =
      localStorage.getItem('user')

    if (savedUser) {

      setUser(JSON.parse(savedUser))
    }

  }, [])

  useEffect(() => {

    if (user) {

      loadStudents()
      loadAttendance()
      loadGroups()
      loadSubjects()
      loadTeachers()
    }

  }, [user])

  async function loadStudents() {

    try {

      const res =
        await fetch('/api/students')

      const data =
        await res.json()

      if (Array.isArray(data)) {

        setStudents(data)

      } else {

        setStudents([])
      }

    } catch (error) {

      console.log(error)
    }
  }

  async function loadGroups() {

    try {

      const res =
        await fetch('/api/groups')

      const data =
        await res.json()

      if (Array.isArray(data)) {

        setGroups(data)

        if (
          data.length > 0 &&
          !activeGroup
        ) {

          setActiveGroup(data[0].name)
        }
      }

    } catch (error) {

      console.log(error)
    }
  }



      async function loadSubjects() {

  try {

    const res =
      await fetch('/api/subjects')

    const data =
      await res.json()

    console.log(data)

    if (Array.isArray(data)) {

      setSubjects(data)

    } else if (data.data) {

      setSubjects(data.data)

    } else {

      setSubjects([])
    }

  } catch (error) {

    console.log(error)
  }
}

 async function loadTeachers() {

  try {

    const res =
      await fetch('/api/teachers')

    const data =
      await res.json()

    console.log(data)

    if (Array.isArray(data)) {

      setTeachers(data)

    } else if (data.data) {

      setTeachers(data.data)

    } else {

      setTeachers([])
    }

  } catch (error) {

    console.log(error)
  }
}
  async function loadAttendance() {

    try {

      const res =
        await fetch('/api/attendance/get')

      const data =
        await res.json()

      if (!data.success) {

        setAttendance({})
        return
      }

      const map: any = {}

      data.data.forEach((a: any) => {

        if (!map[a.date]) {

          map[a.date] = {}
        }

        map[a.date][a.student_id] =
          a.status
      })

      setAttendance(map)

    } catch (error) {

      console.log(error)
    }
  }

  function dayKey() {

    const subject =
      user?.subject || 'general'

    return `${subject}_${month}-${day}`
  }

  async function mark(
    id: number,
    status: string
  ) {

    if (
      user?.role !== 'teacher' &&
      user?.role !== 'admin'
    ) return

    try {

      await fetch(
        '/api/attendance',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            student_id: id,

            date: dayKey(),

            status,

            subject:
              user?.subject ||
              'general'
          })
        }
      )

      await loadAttendance()

    } catch (error) {

      console.log(error)
    }
  }

  async function addSubject() {

    if (!newSubject) return

    try {

      await fetch('/api/subjects', {

        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({
          name: newSubject
        })
      })

      setNewSubject('')

      loadSubjects()

    } catch (error) {

      console.log(error)
    }
  }

  async function addTeacher() {

  if (
    !newTeacher ||
    !teacherSubject ||
    !teacherEmail ||
    !teacherPassword
  ) return

  try {

    await fetch('/api/users', {

      method: 'POST',

      headers: {
        'Content-Type':
          'application/json'
      },

      body: JSON.stringify({

        username: newTeacher,

        email: teacherEmail,

        password: teacherPassword,

        role: 'teacher',

        subject: teacherSubject
      })
    })

    setNewTeacher('')
    setTeacherEmail('')
    setTeacherPassword('')
    setTeacherSubject('')

    loadTeachers()

  } catch (error) {

    console.log(error)
  }
}

    async function deleteStudent(
    id: number
  ) {

    try {

      await fetch(
        `/api/students?id=${id}`,
        {
          method: 'DELETE'
        }
      )

      loadStudents()

    } catch (error) {

      console.log(error)
    }
  }

  async function editStudent(
    student: any
  ) {

    const newName =
      prompt(
        'Нове імʼя студента',
        student.name
      )

    if (!newName) return

    const newGroup =
      prompt(
        'Нова група',
        student.group_name
      )

    if (!newGroup) return

    try {

      await fetch('/api/students', {

        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({

          id: student.id,

          name: newName,

          group_name: newGroup
        })
      })

      loadStudents()
      loadGroups()

    } catch (error) {

      console.log(error)
    }
  }

  async function deleteSubject(
    id: number
  ) {

    try {

      await fetch(
        `/api/subjects?id=${id}`,
        {
          method: 'DELETE'
        }
      )

      loadSubjects()

    } catch (error) {

      console.log(error)
    }
  }

  async function editSubject(
    id: number,
    oldName: string
  ) {

    const newName =
      prompt(
        'Нова назва предмету',
        oldName
      )

    if (!newName) return

    try {

      await fetch('/api/subjects', {

        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({

          id,

          name: newName
        })
      })

      loadSubjects()

    } catch (error) {

      console.log(error)
    }
  }

  async function deleteTeacher(
    id: number
  ) {

    try {

      await fetch(
        `/api/teachers?id=${id}`,
        {
          method: 'DELETE'
        }
      )

      loadTeachers()

    } catch (error) {

      console.log(error)
    }
  }

  async function editTeacher(
    teacher: any
  ) {

    async function deleteStudent(
  id: number
) {

  const confirmDelete =
    confirm(
      'Видалити студента?'
    )

  if (!confirmDelete) return

  try {

    await fetch(
      `/api/students?id=${id}`,
      {
        method: 'DELETE'
      }
    )

    loadStudents()

  } catch (error) {

    console.log(error)
  }
}

async function editStudent(
  student: any
) {

  const newName =
    prompt(
      'Нове імʼя студента',
      student.name
    )

  if (!newName) return

  const newGroup =
    prompt(
      'Нова група',
      student.group_name
    )

  if (!newGroup) return

  try {

    await fetch(
      '/api/students',
      {

        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({

          id: student.id,

          name: newName,

          group_name: newGroup
        })
      }
    )

    loadStudents()
    loadGroups()

  } catch (error) {

    console.log(error)
  }
} 

    const newName =
      prompt(
        'Нове імʼя',
        teacher.name
      )

    if (!newName) return

    const newSubject =
      prompt(
        'Новий предмет',
        teacher.subject
      )

    if (!newSubject) return

    try {

      await fetch('/api/teachers', {

        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({

          id: teacher.id,

          name: newName,

          subject: newSubject
        })
      })

      loadTeachers()

    } catch (error) {

      console.log(error)
    }
  }

  function getStatus(id: number) {

    return (
      attendance[dayKey()]?.[id]
      || 'present'
    )
  }

  function absences(id: number) {

    let total = 0

    Object.keys(attendance)
      .forEach((date) => {

        if (
          attendance[date]?.[id]
          === 'absent'
        ) {

          total++
        }
      })

    return total
  }

  const filtered = students
    .filter((s: any) => {

      const matchSearch =
        s.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchGroup =
        activeGroup === '' ||
        s.group_name === activeGroup

      return (
        matchSearch &&
        matchGroup
      )
    })

  const todayAbsences =

    Object.values(
      attendance[dayKey()] || {}
    )

      .filter(
        (s) => s === 'absent'
      )

      .length

  const totalAbsences =

    Object.values(attendance)

      .reduce((acc: number, d: any) => {

        return (

          acc +

          Object.values(d)

            .filter(
              (s: any) =>
                s === 'absent'
            )

            .length

        )

      }, 0)

  const chartData =

    filtered.map((s: any) => ({

      name: s.name,

      absences: absences(s.id)
    }))

  const chartByDays =

    Object.keys(attendance)

      .map((date) => {

        let totalAbsent = 0

        Object.values(
          attendance[date]
        ).forEach((status: any) => {

          if (
            status === 'absent'
          ) {

            totalAbsent++
          }
        })

        return {

          date,

          absences: totalAbsent
        }
      })

  if (!user) {

    return (

      <LoginForm
        onLogin={(loggedUser: any) => {

          localStorage.setItem(
            'user',
            JSON.stringify(loggedUser)
          )

          setUser(loggedUser)
        }}
      />
    )
  }

  return (

    <div
      style={{
        padding: 30,
        background: '#dce8f7',
        minHeight: '100vh'
      }}
    >

      <h1>
        📊 Dashboard відвідуваності
      </h1>

      <p
        style={{
          fontSize: 18,
          marginBottom: 20
        }}
      >
        👤 Роль:
        <b> {user?.role || 'guest'}</b>

        {user?.subject && (
          <>
            {' '}| 📚 {user.subject}
          </>
        )}
      </p>

      <button
        onClick={() => {

          localStorage.removeItem('user')

          setUser(null)
        }}

        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: 10,
          marginBottom: 20,
          cursor: 'pointer',
          background: '#f2dc7d'
        }}
      >
        Вийти
      </button>

      {user?.role === 'admin' && (

        <>
          <AddStudentForm
            onAdded={() => {

              loadStudents()
              loadGroups()
            }}
          />

          <div
            style={{
              background: 'white',
              padding: 20,
              borderRadius: 20,
              marginBottom: 30
            }}
          >

            <h2>📚 Предмети</h2>

            <div
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 20
              }}
            >

              <input
                placeholder="Назва предмету"
                value={newSubject}
                onChange={(e) =>
                  setNewSubject(
                    e.target.value
                  )
                }

                style={{
                  padding: 10,
                  borderRadius: 10,
                  flex: 1
                }}
              />

              <button
                onClick={addSubject}

                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 10,
                  background: '#b1e8a8'
                }}
              >
                Додати
              </button>

            </div>

            {subjects.map((s: any) => (

              <div
                key={s.id}

                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 10
                }}
              >

                <span>
                  • {s.name}
                </span>

                <button
                  onClick={() =>
                    editSubject(
                      s.id,
                      s.name
                    )
                  }
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    deleteSubject(s.id)
                  }
                >
                  🗑
                </button>

              </div>

            ))}

          <h2
  style={{
    marginTop: 30
  }}
>
  👨‍🏫 Викладачі
</h2>

<div
  style={{
    display: 'flex',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap'
  }}
>

  <input
    placeholder="Імʼя викладача"

    value={newTeacher}

    onChange={(e) =>
      setNewTeacher(
        e.target.value
      )
    }

    style={{
      padding: 10,
      borderRadius: 10,
      flex: 1
    }}
  />

  <input
    placeholder="Email"

    value={teacherEmail}

    onChange={(e) =>
      setTeacherEmail(
        e.target.value
      )
    }

    style={{
      padding: 10,
      borderRadius: 10
    }}
  />

  <input
    placeholder="Пароль"

    value={teacherPassword}

    onChange={(e) =>
      setTeacherPassword(
        e.target.value
      )
    }

    style={{
      padding: 10,
      borderRadius: 10
    }}
  />

  <select
    value={teacherSubject}

    onChange={(e) =>
      setTeacherSubject(
        e.target.value
      )
    }
  >

    <option value="">
      Предмет
    </option>

    {subjects.map((s: any) => (

      <option
        key={s.id}
        value={s.name}
      >
        {s.name}
      </option>

    ))}

  </select>

  <button
    onClick={addTeacher}

    style={{
      padding: '10px 20px',
      border: 'none',
      borderRadius: 10,
      background: '#b1e8a8',
      cursor: 'pointer'
    }}
  >
    Додати
  </button>

</div>

{teachers.map((t: any) => (

              <div
                key={t.id}

                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 10
                }}
              >

                <span>
                  • {t.name} —
                  {' '}
                  {t.subject}
                </span>

                <button
                  onClick={() =>
                    editTeacher(t)
                  }
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    deleteTeacher(t.id)
                  }
                >
                  🗑
                </button>

              </div>

            ))}

          </div>
        </>

      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(4,1fr)',
          gap: 20,
          marginBottom: 30
        }}
      >

        <Card
          title="👨‍🎓 Студенти"
          value={filtered.length}
        />

        <Card
          title="❌ Пропуски сьогодні"
          value={todayAbsences}
        />

        <Card
          title="📅 День"
          value={`${day} ${month}`}
        />

        <Card
          title="📊 Всього пропусків"
          value={totalAbsences}
        />

      </div>

      <select
        value={month}
        onChange={(e) =>
          setMonth(e.target.value)
        }
      >

        {months.map((m) => (

          <option
            key={m}
            value={m}
          >
            {m}
          </option>

        ))}

      </select>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(6,1fr)',
          gap: 10,
          marginBottom: 30
        }}
      >

        {Array.from(
          { length: 30 },
          (_, i) => (

            <button
              key={i}

              onClick={() =>
                setDay(i + 1)
              }
            >
              {i + 1}
            </button>

          )
        )}

      </div>

      <input
        placeholder="🔍 Пошук"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }

        style={{
          padding: 12,
          width: '100%',
          borderRadius: 10,
          marginBottom: 20
        }}
      />

      <div style={{ marginBottom: 20 }}>

        {groups.map((g: any) => (

          <button
            key={g.id}

            onClick={() =>
              setActiveGroup(g.name)
            }
          >
            {g.name}
          </button>

        ))}

      </div>

      <table
        style={{
          width: '100%',
          background: 'white'
        }}
      >

        <thead>

          <tr>

            <th style={thStyle}>
              Студент
            </th>

            <th style={thStyle}>
              Група
            </th>

            <th style={thStyle}>
              Пропуски
            </th>

            <th style={thStyle}>
              Статус
            </th>

            <th style={thStyle}>
              Дії
            </th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((s: any) => (

            <tr key={s.id}>

              <td style={tdStyle}>
                {s.name}
              </td>

              <td style={tdStyle}>
                {s.group_name}
              </td>

              <td style={tdStyle}>
                {absences(s.id)}
              </td>

              <td style={tdStyle}>

                {getStatus(s.id)
                  === 'absent'
                  ? '❌'
                  : '✅'}

              </td>

   <td style={tdStyle}>

  {user?.role === 'teacher' && (

    <>

      <button
        onClick={() =>
          mark(
            s.id,
            'present'
          )
        }

        style={circleGreen}
      >
        ✅
      </button>

      <button
        onClick={() =>
          mark(
            s.id,
            'absent'
          )
        }

        style={circleRed}
      >
        ❌
      </button>

    </>

  )}

  {user?.role === 'admin' && (

    <>

      <button
        onClick={() =>
          editStudent(s)
        }

        style={{
          marginLeft: 10,
          padding: 8,
          border: 'none',
          borderRadius: 8,
          background: '#74c0fc',
          cursor: 'pointer'
        }}
      >
        ✏️
      </button>

      <button
        onClick={() =>
          deleteStudent(s.id)
        }

        style={{
          marginLeft: 10,
          padding: 8,
          border: 'none',
          borderRadius: 8,
          background: '#ff8787',
          cursor: 'pointer'
        }}
      >
        🗑
      </button>

    </>

  )}

  {user?.role !== 'teacher' &&
   user?.role !== 'admin' && (

    <span>
      🔒 Немає доступу
    </span>

  )}

</td>

            </tr>

          ))}

        </tbody>

      </table>

      <h2 style={{ marginTop: 40 }}>
        📈 Пропуски по студентах
      </h2>

      <div
        style={{
          width: '100%',
          height: 300
        }}
      >

        <ResponsiveContainer>

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="absences"
              fill="#ff6b6b"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <h2 style={{ marginTop: 40 }}>
        📉 Пропуски по днях
      </h2>

      <div
        style={{
          width: '100%',
          height: 300
        }}
      >

        <ResponsiveContainer>

          <LineChart
            data={chartByDays}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="absences"
              stroke="#007bff"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

function Card({
  title,
  value
}: any) {

  return (

    <div
      style={{
        background: 'white',
        borderRadius: 20,
        padding: 20,
        textAlign: 'center'
      }}
    >

      <h3>{title}</h3>

      <h2>{value}</h2>

    </div>
  )
}

const thStyle: any = {
  padding: 12,
  borderBottom: '1px solid #ddd'
}

const tdStyle: any = {
  padding: 12,
  borderBottom: '1px solid #eee'
}

const circleGreen: any = {
  padding: 10,
  borderRadius: '50%',
  border: 'none',
  background: '#b1e8a8',
  marginRight: 10,
  cursor: 'pointer'
}

const circleRed: any = {
  padding: 10,
  borderRadius: '50%',
  border: 'none',
  background: '#f2a4a4',
  cursor: 'pointer'
}