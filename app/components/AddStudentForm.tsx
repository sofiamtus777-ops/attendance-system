'use client'

import { useEffect, useState } from 'react'

export default function AddStudentForm({ onAdded }: any) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [group, setGroup] = useState('')
  const [groups, setGroups] = useState<any[]>([])

  useEffect(() => {
    loadGroups()
  }, [])

  async function loadGroups() {

    try {

      const res =
        await fetch('/api/groups')

      const data =
        await res.json()

      setGroups(data)

      if (data.length > 0) {
        setGroup(data[0].name)
      }

    } catch (error) {

      console.log(error)
    }
  }

  async function addStudent(e: any) {

    e.preventDefault()

    if (
      !name ||
      !email ||
      !password ||
      !group
    ) {
      alert('Заповніть всі поля')
      return
    }

    try {

      // Створюємо користувача

      const userRes =
        await fetch('/api/users', {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            username: name,
            email,
            password,
            role: 'student',
            subject: null
          })
        })

      const userData =
        await userRes.json()

      if (!userData.success) {

        alert(
          'Помилка створення користувача'
        )

        return
      }

      // Створюємо студента

      const studentRes =
        await fetch('/api/students', {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            name,
            group_name: group,
            user_id: userData.userId
          })
        })

      const studentData =
        await studentRes.json()

      if (!studentData.success) {

        alert(
          'Помилка створення студента'
        )

        return
      }

      setName('')
      setEmail('')
      setPassword('')

      if (groups.length > 0) {
        setGroup(groups[0].name)
      }

      if (onAdded) {
        onAdded()
      }

      alert('Студента успішно створено')

    } catch (error) {

      console.log(error)

      alert('Сталася помилка')
    }
  }

  return (

    <form
      onSubmit={addStudent}
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 20,
        flexWrap: 'wrap'
      }}
    >

      <input
        type="text"
        placeholder="Ім'я студента"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <select
        value={group}
        onChange={(e) =>
          setGroup(e.target.value)
        }
      >

        {groups.map((g: any) => (

          <option
            key={g.id}
            value={g.name}
          >
            {g.name}
          </option>

        ))}

      </select>

      <button type="submit">
        Додати студента
      </button>

    </form>
  )
}